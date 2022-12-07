import { useMemo, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { register } from '@/apis/register';
import type { ErrorHandlers } from '@/hooks/use-api';
import useApi from '@/hooks/use-api';
import { useConfirmModal } from '@/hooks/use-confirm-modal';
import { PageContext } from '@/hooks/use-page-context';

const useUsernamePasswordRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToast } = useContext(PageContext);
  const { show } = useConfirmModal();

  const resetPasswordErrorHandlers: ErrorHandlers = useMemo(
    () => ({
      'user.username_already_in_use': async (error) => {
        await show({ type: 'alert', ModalContent: error.message, cancelText: 'action.got_it' });
        navigate(-1);
      },
    }),
    [navigate, show]
  );

  const { result, run: asyncRegister } = useApi(register, resetPasswordErrorHandlers);

  useEffect(() => {
    if (result?.redirectTo) {
      window.location.replace(result.redirectTo);
    }
  }, [result, setToast, t]);

  return {
    register: asyncRegister,
  };
};

export default useUsernamePasswordRegister;
