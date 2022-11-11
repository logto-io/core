import { SignInMode } from '@logto/schemas';
import { useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import AppContent from './containers/AppContent';
import LoadingLayerProvider from './containers/LoadingLayerProvider';
import usePageContext from './hooks/use-page-context';
import usePreview from './hooks/use-preview';
import initI18n from './i18n/init';
import Callback from './pages/Callback';
import Consent from './pages/Consent';
import Continue from './pages/Continue';
import ContinueWithEmailOrPhone from './pages/Continue/EmailOrPhone';
import ErrorPage from './pages/ErrorPage';
import ForgotPassword from './pages/ForgotPassword';
import Passcode from './pages/Passcode';
import PasswordRegisterWithUsername from './pages/PasswordRegisterWithUsername';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SecondaryRegister from './pages/SecondaryRegister';
import SecondarySignIn from './pages/SecondarySignIn';
import SignIn from './pages/SignIn';
import SignInPassword from './pages/SignInPassword';
import SocialLanding from './pages/SocialLanding';
import SocialRegister from './pages/SocialRegister';
import SocialSignIn from './pages/SocialSignInCallback';
import { getSignInExperienceSettings } from './utils/sign-in-experience';

import './scss/normalized.scss';

const App = () => {
  const { context, Provider } = usePageContext();
  const { experienceSettings, setLoading, setExperienceSettings } = context;
  const [isPreview] = usePreview(context);

  useEffect(() => {
    if (isPreview) {
      return;
    }

    (async () => {
      const settings = await getSignInExperienceSettings();

      // Note: i18n must be initialized ahead of page render
      await initI18n(settings.languageInfo);

      // Init the page settings and render
      setExperienceSettings(settings);
    })();
  }, [isPreview, setExperienceSettings, setLoading]);

  if (!experienceSettings) {
    return null;
  }

  const isRegisterOnly = experienceSettings.signInMode === SignInMode.Register;
  const isSignInOnly = experienceSettings.signInMode === SignInMode.SignIn;

  return (
    <Provider value={context}>
      <AppContent>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/sign-in" />} />
            <Route path="/sign-in/consent" element={<Consent />} />
            <Route
              path="/unknown-session"
              element={<ErrorPage message="error.invalid_session" />}
            />

            <Route element={<LoadingLayerProvider />}>
              {/* Sign-in */}
              <Route
                path="/sign-in"
                element={isRegisterOnly ? <Navigate replace to="/register" /> : <SignIn />}
              />
              <Route path="/sign-in/social/:connector" element={<SocialSignIn />} />
              <Route path="/sign-in/:method" element={<SecondarySignIn />} />
              <Route path="/sign-in/:method/password" element={<SignInPassword />} />

              {/* Register */}
              <Route
                path="/register"
                element={isSignInOnly ? <Navigate replace to="/sign-in" /> : <Register />}
              />
              <Route
                path="/register/username/password"
                element={<PasswordRegisterWithUsername />}
              />
              <Route path="/register/:method" element={<SecondaryRegister />} />

              {/* Forgot password */}
              <Route path="/forgot-password/reset" element={<ResetPassword />} />
              <Route path="/forgot-password/:method" element={<ForgotPassword />} />

              {/* Continue set up missing profile */}
              <Route path="/continue/email-or-sms/:method" element={<ContinueWithEmailOrPhone />} />
              <Route path="/continue/:method" element={<Continue />} />

              {/* Social sign-in pages */}
              <Route path="/callback/:connector" element={<Callback />} />
              <Route path="/social/register/:connector" element={<SocialRegister />} />
              <Route path="/social/landing/:connector" element={<SocialLanding />} />

              {/* Always keep route path with param as the last one */}
              <Route path="/:type/:method/passcode-validation" element={<Passcode />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AppContent>
    </Provider>
  );
};

export default App;
