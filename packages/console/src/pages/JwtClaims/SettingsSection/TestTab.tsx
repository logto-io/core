import { LogtoJwtTokenPath, type JsonObject, type RequestErrorBody } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import classNames from 'classnames';
import { HTTPError } from 'ky';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext, type ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import Button from '@/ds-components/Button';
import Card from '@/ds-components/Card';
import useApi from '@/hooks/use-api';

import MonacoCodeEditor, { type ModelControl, type ModelSettings } from '../MonacoCodeEditor';
import { type JwtClaimsFormType } from '../type';
import {
  accessTokenPayloadTestModel,
  clientCredentialsPayloadTestModel,
  userContextTestModel,
} from '../utils/config';
import { formatFormDataToTestRequestPayload } from '../utils/format';

import TestResult, { type TestResultData } from './TestResult';
import * as styles from './index.module.scss';

type Props = {
  isActive: boolean;
};

const accessTokenModelSettings = [accessTokenPayloadTestModel, userContextTestModel];
const clientCredentialsModelSettings = [clientCredentialsPayloadTestModel];
const testEndpointPath = 'api/configs/jwt-customizer/test';
const jwtCustomizerGeneralErrorCode = 'jwt_customizer.general';
/**
 * SampleCode form filed value update formatter.
 * Reset the field to undefined if the value is the same as the default value
 */
const updateSampleCodeValue = (model: ModelSettings, newValue: string | undefined) => {
  return newValue === model.defaultValue ? undefined : newValue;
};

function TestTab({ isActive }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console.jwt_claims' });
  const [testResult, setTestResult] = useState<TestResultData>();
  const [activeModelName, setActiveModelName] = useState<string>();
  const api = useApi({ hideErrorToast: true });

  const { watch, control, formState, getValues } = useFormContext<JwtClaimsFormType>();
  const tokenType = watch('tokenType');

  const editorModels = useMemo(
    () =>
      tokenType === LogtoJwtTokenPath.AccessToken
        ? accessTokenModelSettings
        : clientCredentialsModelSettings,
    [tokenType]
  );

  useEffect(() => {
    setActiveModelName(editorModels[0]?.name);
  }, [editorModels, tokenType]);

  // Clear the test result when the token type changes
  useEffect(() => {
    setTestResult(undefined);
  }, [tokenType]);

  const onTestHandler = useCallback(async () => {
    const payload = getValues();

    const result = await api
      .post(testEndpointPath, {
        json: formatFormDataToTestRequestPayload(payload),
      })
      .json<JsonObject>()
      .catch(async (error: unknown) => {
        if (error instanceof HTTPError) {
          const { response } = error;
          const metadata = await response.clone().json<RequestErrorBody>();
          if (metadata.code === jwtCustomizerGeneralErrorCode) {
            const result = z.object({ message: z.string() }).safeParse(metadata.data);
            if (result.success) {
              setTestResult({
                error: result.data.message,
              });
              return;
            }
          }
        }

        setTestResult({
          error: error instanceof Error ? error.message : String(error),
        });
      });

    if (result) {
      setTestResult({ payload: JSON.stringify(result, null, 2) });
    }
  }, [api, getValues]);

  const getModelControllerProps = useCallback(
    ({ value, onChange }: ControllerRenderProps<JwtClaimsFormType, 'testSample'>): ModelControl => {
      return {
        value:
          activeModelName === userContextTestModel.name ? value?.contextSample : value?.tokenSample,
        onChange: (newValue: string | undefined) => {
          // Form value is a object we need to update the specific field
          const updatedValue: JwtClaimsFormType['testSample'] = {
            ...value,
            ...conditional(
              activeModelName === userContextTestModel.name && {
                contextSample: updateSampleCodeValue(userContextTestModel, newValue),
              }
            ),
            ...conditional(
              activeModelName === accessTokenPayloadTestModel.name && {
                tokenSample: updateSampleCodeValue(accessTokenPayloadTestModel, newValue),
              }
            ),
            ...conditional(
              activeModelName === clientCredentialsPayloadTestModel.name && {
                // Reset the field to undefined if the value is the same as the default value
                tokenSample: updateSampleCodeValue(clientCredentialsPayloadTestModel, newValue),
              }
            ),
          };

          onChange(updatedValue);
        },
      };
    },
    [activeModelName]
  );

  const validateSampleCode = useCallback(
    (value: JwtClaimsFormType['testSample']) => {
      if (!value) {
        return true;
      }

      for (const [_, sampleCode] of Object.entries(value)) {
        if (sampleCode) {
          try {
            JSON.parse(sampleCode);
          } catch {
            return t('form_error.invalid_json');
          }
        }
      }

      return true;
    },
    [t]
  );

  return (
    <div className={classNames(styles.tabContent, isActive && styles.active)}>
      <Card className={classNames(styles.card, styles.flexGrow, styles.flexColumn)}>
        <div className={styles.headerRow}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>{t('tester.title')}</div>
            <div className={styles.cardSubtitle}>{t('tester.subtitle')}</div>
          </div>
          <Button title="jwt_claims.tester.run_button" type="primary" onClick={onTestHandler} />
        </div>
        <div className={classNames(styles.cardContent, styles.flexColumn, styles.flexGrow)}>
          {formState.errors.testSample && (
            <div className={styles.error}>{formState.errors.testSample.message}</div>
          )}
          <Controller
            // Force rerender the controller when the token type changes
            // Otherwise the input field will not be updated
            key={tokenType}
            control={control}
            name="testSample"
            rules={{
              validate: validateSampleCode,
            }}
            render={({ field }) => (
              <MonacoCodeEditor
                className={testResult ? styles.shrinkCodeEditor : styles.flexGrow}
                enabledActions={['restore', 'copy']}
                models={editorModels}
                activeModelName={activeModelName}
                setActiveModel={setActiveModelName}
                // Pass the value and onChange handler based on the active model
                {...getModelControllerProps(field)}
              />
            )}
          />
          {testResult && (
            <TestResult
              testResult={testResult}
              onClose={() => {
                setTestResult(undefined);
              }}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

export default TestTab;
