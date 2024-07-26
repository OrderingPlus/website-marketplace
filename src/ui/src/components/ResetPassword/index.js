import React, { useRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import {
  ResetPasswordContainer,
  FormSide,
  HeroSide,
  FormInput,
  TitleHeroSide
} from './styles'

import { useLanguage, ResetPassword as ResetPasswordController } from '~components'
import {
  Alert,
  Input,
  Button,
  LoginForm,
  Modal
} from '~ui'

const ResetPasswordUI = (props) => {
  const {
    code,
    random,
    formState,
    resetPasswordData,
    handleResetPassword,
    handleChangeInput,
    redirectResetPassword
  } = props

  const { handleSubmit, register, errors, watch } = useForm()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [, t] = useLanguage()
  const theme = useTheme()

  const password = useRef({})

  password.current = watch('password', '')

  const onSubmit = () => {
    if (code && random) {
      handleResetPassword()
    } else {
      redirectResetPassword && redirectResetPassword(resetPasswordData)
    }
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  const handleSuccessLogin = (user) => {
    if (user) {
      setOpenAuthModal(false)
    }
  }

  useEffect(() => {
    if (!formState.loading && formState.result?.error) {
      setAlertState({
        open: true,
        content: formState.result?.result || [t('ERROR', 'Error')]
      })
    } else if (!formState.loading && formState.result?.result?.length) {
      setAlertState({
        open: true,
        content: t('PASSWORD_RESET_SUCCESS', 'Password changed successfully')
      })
    }
    if (!formState.loading && formState.result?.result?.length > 0 && !formState.result.error) {
      setOpenAuthModal(true)
    }
  }, [formState])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertState({
        open: true,
        content: Object.values(errors).map(error => error.message)
      })
    }
  }, [errors])

  useEffect(() => {
    return () => closeAlert()
  }, [])

  return (
    <ResetPasswordContainer>
      <HeroSide>
        <TitleHeroSide>
          <h1>{t('TITLE_RESET_PASSWORD', 'Reset password')}</h1>
          <p>{code && random ? t('SUBTITLE_RESET_PASSWORD', 'Reset your password') : t('RESET_PASSWORD_CODES_TITLE', 'Please insert the codes')}</p>
        </TitleHeroSide>
      </HeroSide>
      {code && random
        ? (
        <FormSide>
          <img src={theme?.images?.logos?.logotype} alt='Logo' width='200' height='66' loading='lazy' />
          <FormInput
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type='password'
              name='password'
              aria-label='password'
              spellcheck='false'
              ref={register({
                required: t('VALIDATION_ERROR_PASSWORD_REQUIRED', 'The field password is required'),
                minLength: {
                  value: 8,
                  message: t('VALIDATION_ERROR_PASSWORD_MIN_STRING', 'The Password must be at least 8 characters.').replace('_attribute_', t('PASSWORD', 'Password')).replace('_min_', 8)
                }
              })}
              placeholder={t('NEW_PASSWORD', 'New passowrd')}
              onChange={handleChangeInput}
              autoComplete='off'
            />
            <Input
              type='password'
              name='confirm-password'
              aria-label='confirm-password'
              spellcheck='false'
              ref={register({
                required: t('VALIDATION_ERROR_PASSWORD_CONFIRM_REQUIRED', 'The field password confirm is required'),
                validate: value =>
                  value === password.current || t('VALIDATION_ERROR_PASSWORDS_MATCH', 'The passwords do not match')
              })}
              placeholder={t('CONFIRM_PASSWORD', 'Confirm Password')}
              onChange={handleChangeInput}
              autoComplete='off'
            />
            <Button
              type='submit'
              color={(formState.loading || formState.result?.result?.length) ? 'secondary' : 'primary'}
              disabled={(formState.loading || formState.result?.result?.length)}
            >
              {!formState.loading ? t('CHANGE_PASSWORD', 'Change password') : t('LOADING', 'Loading')}
            </Button>
          </FormInput>
        </FormSide>
          )
        : (
        <FormSide>
          <img src={theme?.images?.logos?.logotype} alt='Logo' width='200' height='66' loading='lazy' />
          <FormInput
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {!code && (
              <Input
                name='code'
                aria-label='code'
                ref={register({
                  required: t('RESET_PASSWORD_CODE_REQUIRED', 'The field code is required')
                })}
                placeholder={t('CODE', 'Code')}
                onChange={handleChangeInput}
                autoComplete='off'
              />
            )}
            {!random && (
              <Input
                name='random'
                aria-label='random'
                ref={register({
                  required: t('RESET_PASSWORD_RANDOM_REQUIRED', 'The field random is required')
                })}
                placeholder={t('RAMDON', 'Random')}
                onChange={handleChangeInput}
                autoComplete='off'
              />
            )}
            <Button
              type='submit'
              color='primary'
            >
              {t('SUBMIT_CODES', 'Submit codes')}
            </Button>
          </FormInput>
        </FormSide>
          )}
      {openAuthModal && (
        <Modal
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
          width='700px'
        >
          <LoginForm
            handleSuccessLogin={handleSuccessLogin}
            useLoginByCellphone
            isPopup
          />
        </Modal>
      )}
      <Alert
        title={t('RESET_PASSWORD', 'Reset Password')}
        content={alertState?.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </ResetPasswordContainer>
  )
}

export const ResetPassword = (props) => {
  const resetPasswordProps = {
    ...props,
    UIComponent: ResetPasswordUI
  }

  return <ResetPasswordController {...resetPasswordProps} />
}
