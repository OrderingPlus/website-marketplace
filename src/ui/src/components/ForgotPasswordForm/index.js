import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import {
  ForgotPasswordContainer,
  FormSide,
  FormInput,
  RedirectLink,
  ReCaptchaWrapper,
  ValidationText
} from './styles'

import {
  ForgotPasswordForm as ForgotPasswordController,
  useLanguage,
  ReCaptcha
} from '~components'

import {
  Alert,
  Input,
  Button
} from '~ui'

const ForgotPasswordUI = (props) => {
  const {
    hanldeChangeInput,
    handleButtonForgotPasswordClick,
    formState,
    elementLinkToLogin,
    isPopup,
    handleReCaptcha,
    enableReCaptcha
  } = props

  const formMethods = useForm()
  const [alertState, setAlertState] = useState({ open: false, title: '', content: [], success: false })
  const [, t] = useLanguage()
  const theme = useTheme()

  const onSubmit = () => {
    setAlertState({ ...alertState, success: true })
    handleButtonForgotPasswordClick()
  }

  const closeAlert = () => {
    setAlertState({
      ...alertState,
      open: false,
      content: []
    })
  }

  const handleChangeInputEmail = (e) => {
    hanldeChangeInput({ target: { name: 'email', value: e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, '') } })
    formMethods.setValue('email', e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''))
  }

  useEffect(() => {
    if (!formState.loading && formState.result?.error) {
      setAlertState({
        ...alertState,
        success: false,
        open: true,
        title: t('ERROR_UNKNOWN', 'An error has ocurred'),
        content: formState.result?.result || [t('ERROR', 'Error')]
      })
    }
    if (!formState.loading && !formState.result?.error && alertState.success) {
      setAlertState({
        ...alertState,
        open: true,
        title: t('LINK_SEND_SUCCESSFULLY', 'Link Sent Successfully'),
        content: t('IF_ACCOUNT_EXIST_EMAIL_SEND_PASSWORD', 'If an account exists with this email a password will be sent')
      })
    }
  }, [formState.loading])

  useEffect(() => {
    if (!formState.loading && formState.result?.error) {
      setAlertState({
        open: true,
        content: formState.result?.result || [t('ERROR', 'Error')]
      })
    }
  }, [formState])

  return (
    <ForgotPasswordContainer isPopup={isPopup}>
      <h1>{t('TITLE_FORGOT_PASSWORD', 'Forgot your password?')}</h1>
      <FormSide isPopup={isPopup}>
        <img src={theme?.images?.logos?.logotype} alt='Logo' width='200' height='66' loading='lazy' />
        <FormInput
          noValidate
          isPopup={isPopup}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {formMethods?.errors?.email && (
            <ValidationText>
              {formMethods.errors?.email?.message} {formMethods?.errors?.email?.type === 'required' && '*'}
            </ValidationText>
          )}
          <Input
            type='email'
            name='email'
            aria-label='email'
            placeholder={t('EMAIL', 'Email')}
            ref={formMethods.register({
              required: t('VALIDATION_ERROR_EMAIL_REQUIRED', 'The field Email is required').replace('_attribute_', t('EMAIL', 'Email')),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('INVALID_ERROR_EMAIL', 'Invalid email address').replace('_attribute_', t('EMAIL', 'Email'))
              }
            })}
            onChange={handleChangeInputEmail}
            autoComplete='off'
          />
          {props.isRecaptchaEnable && enableReCaptcha && (
            <ReCaptchaWrapper>
              <ReCaptcha handleReCaptcha={handleReCaptcha} />
            </ReCaptchaWrapper>
          )}
          <Button color={formState.loading || alertState.success ? 'secondary' : 'primary'} type='submit' disabled={formState.loading || alertState.success}>
            {formState.loading
              ? t('LOADING', 'Loading...')
              : alertState.success && formState.result.result
                ? t('LINK_SEND_FORGOT_PASSWORD', 'Link Sent')
                : t('FRONT_RECOVER_PASSWORD', 'Recover Password')}
          </Button>
        </FormInput>
        {elementLinkToLogin && (
          <RedirectLink register isPopup={isPopup}>
            <span>{t('SIGN_IN_MESSAGE', 'Do you want to sign in?')}</span>
            {elementLinkToLogin}
          </RedirectLink>
        )}
      </FormSide>
      <Alert
        title={alertState?.title || t('TITLE_FORGOT_PASSWORD', 'Forgot your password?')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </ForgotPasswordContainer>
  )
}

export const ForgotPasswordForm = (props) => {
  const ForgotPasswordProps = {
    ...props,
    isRecaptchaEnable: true,
    UIComponent: ForgotPasswordUI
  }
  return <ForgotPasswordController {...ForgotPasswordProps} />
}
