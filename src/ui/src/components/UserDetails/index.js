import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { parsePhoneNumber } from 'libphonenumber-js'
import MdClose from '@meronex/icons/md/MdClose'
import FaRegUser from '@meronex/icons/fa/FaRegUser'
import PhoneInput from 'react-phone-number-input'

import {
  Container,
  SideForm,
  UserData,
  UserName,
  ModalIcon,
  CountryFlag,
  PhoneContainer,
  SkeletonsContainer,
  ChangeCustomerText,
  UserIcon
} from './styles'

import {
  UserFormDetails as UserFormController,
  useLanguage,
  useSession
} from '~components'

import {
  useCountdownTimer,
  Alert,
  Modal,
  VerifyCodeForm,
  UserFormDetailsUI
} from '~ui'

const UserDetailsUI = (props) => {
  const {
    isEdit,
    formState,
    // cleanFormState,
    cartStatus,
    toggleIsEdit,
    validationFields,
    isUserDetailsEdit,
    isCustomerMode,
    userState,
    // isModal,
    setIsOpenUserData,
    // isAddressFormOpen,
    onClose,
    handleSendVerifyCode,
    verifyPhoneState,
    requiredFields,
    setFormState,
    setIsSuccess,
    isCheckoutPlace,
    isCheckout
  } = props

  const [, t] = useLanguage()
  const [{ user, loading }] = useSession()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [skeletonsLength] = useState(requiredFields)
  const userData = userState.result?.result || props.userData || formState.result?.result || user

  const [willVerifyOtpState, setWillVerifyOtpState] = useState(false)
  const [otpLeftTime, , resetOtpLeftTime] = useCountdownTimer(
    600, willVerifyOtpState)

  useEffect(() => {
    if (isUserDetailsEdit) {
      !isEdit && toggleIsEdit()
    }
  }, [isUserDetailsEdit])

  useEffect(() => {
    setIsOpenUserData && setIsOpenUserData(isEdit)
  }, [isEdit])

  useEffect(() => {
    if (verifyPhoneState?.result?.error) {
      setAlertState({
        open: true,
        content: verifyPhoneState?.result?.result || [t('ERROR', 'Error')]
      })
    } else { resetOtpLeftTime() }
  }, [verifyPhoneState?.result?.result])

  // const toggleEditState = () => {
  //   toggleIsEdit()
  //   cleanFormState({ changes: {} })
  // }

  const handleSendOtp = () => {
    if (willVerifyOtpState && formState?.changes?.cellphone && formState?.changes?.country_phone_code) {
      const { cellphone, country_phone_code: countryPhoneCode } = formState?.changes

      resetOtpLeftTime()

      handleSendVerifyCode({
        cellphone,
        country_phone_code: countryPhoneCode
      })
    }
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  const handleSendPhoneCode = (values) => {
    setWillVerifyOtpState(false)
    setFormState({
      ...formState,
      changes: {
        ...formState?.changes,
        verification_code: values?.code
      }
    })
  }

  useEffect(() => {
    if (otpLeftTime === 0) {
      setAlertState({
        open: true,
        content: t('TIME_IS_UP_PLEASE_RESEND_CODE', 'Time is up. Please resend code again')
      })
    }
  }, [otpLeftTime])

  useEffect(() => {
    handleSendOtp()
  }, [willVerifyOtpState])

  useEffect(() => {
    if (isCheckoutPlace &&
      (requiredFields?.length === 0 || (requiredFields?.length === 1 && requiredFields?.includes('email') && isCustomerMode)) &&
      !formState?.loading
    ) {
      setIsSuccess && setIsSuccess(true)
      onClose && onClose()
    }
  }, [isCheckoutPlace, requiredFields])

  return (
    <>
      {((validationFields.loading || formState.loading || userState.loading || loading)) && (
        <SkeletonsContainer>
          <UserData>
            {skeletonsLength?.map(field => (
              <div key={field?.id}>
                <Skeleton width={250} height={35} />
                <Skeleton width='100%' height={40} />
              </div>
            ))}
            <Skeleton width='100%' height={44} style={{ marginTop: 20 }} />
          </UserData>
        </SkeletonsContainer>
      )}

      {!(validationFields.loading || formState.loading || userState.loading || loading) && (
        <Container isCheckout={isCheckout}>
          {!isEdit
            ? (
              <>
                <UserIcon>
                  <FaRegUser />
                </UserIcon>
                <UserData>
                  {(userData?.name || userData?.middle_name || userData?.lastname || userData?.second_lastname) && (
                    <UserName>
                      {userData?.name} {userData?.middle_name} {userData?.lastname} {userData?.second_lastname}
                    </UserName>
                  )}
                  {((userData?.cellphone ?? userData?.guest_cellphone) || (user?.cellphone ?? user?.guest_cellphone)) && (
                    <PhoneContainer>
                      <CountryFlag>
                        {
                          userData?.country_phone_code && (userData?.cellphone ?? userData?.guest_cellphone) && (
                            <PhoneInput onChange={() => { }} defaultCountry={parsePhoneNumber(`+${(userData?.country_phone_code?.replace('+', ''))} ${userData?.[userData?.guest_id ? 'guest_cellphone' : 'cellphone']?.replace(`+${userData?.country_phone_code}`, '')}`)?.country} />
                          )
                        }
                      </CountryFlag>
                      <p>
                        {userData?.guest_id ? userData?.guest_cellphone : userData?.cellphone}
                      </p>
                    </PhoneContainer>
                  )}
                  {(userData?.email ?? userData?.guest_email) && (
                    <p>{userData?.guest_id ? userData?.guest_email : userData?.email}</p>
                  )}
                </UserData>
                <ChangeCustomerText>
                  {cartStatus !== 2 && (
                    <span onClick={() => toggleIsEdit()}>{t('CHANGE', 'Change')}</span>
                  )}
                </ChangeCustomerText>
              </>
              )
            : (
              <SideForm>
                {!isCheckoutPlace && (
                  <ModalIcon>
                    <MdClose onClick={() => toggleIsEdit()} />
                  </ModalIcon>
                )}
                <UserFormDetailsUI
                  {...props}
                  userData={userData}
                  isCustomerMode={isCustomerMode}
                  setWillVerifyOtpState={setWillVerifyOtpState}
                />
              </SideForm>
              )}
        </Container>
      )}
      <Alert
        title={t('PROFILE', 'Profile')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
      {willVerifyOtpState && (
        <Modal
          title={t('ENTER_VERIFICATION_CODE', 'Enter verification code')}
          open={willVerifyOtpState}
          width='700px'
          height='420px'
          onClose={() => setWillVerifyOtpState(false)}
        >
          <VerifyCodeForm
            otpLeftTime={otpLeftTime}
            credentials={formState?.changes}
            handleSendOtp={handleSendOtp}
            handleCheckPhoneCode={handleSendPhoneCode}
            email={(userData?.email || user?.email)}
            isPhone
          />
        </Modal>
      )}
    </>
  )
}

export const UserDetails = (props) => {
  const userDetailsProps = {
    ...props,
    UIComponent: UserDetailsUI
  }

  return <UserFormController {...userDetailsProps} />
}
