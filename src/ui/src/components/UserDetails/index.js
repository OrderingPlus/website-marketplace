import React, { useEffect, useState } from 'react'
import FcCancel from '@meronex/icons/fc/FcCancel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { parsePhoneNumber } from 'libphonenumber-js'
import MdClose from '@meronex/icons/md/MdClose'
import PhoneInput from 'react-phone-number-input'

import {
  Container,
  Header,
  SideForm,
  UserData,
  UserName,
  ModalIcon,
  TitleContainer,
  CountryFlag,
  PhoneContainer,
  SkeletonsContainer,
  ChangeCustomerText
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
    cleanFormState,
    cartStatus,
    toggleIsEdit,
    validationFields,
    isUserDetailsEdit,
    isCustomerMode,
    userState,
    isModal,
    setIsOpenUserData,
    isAddressFormOpen,
    onClose,
    handleSendVerifyCode,
    verifyPhoneState,
    requiredFields,
    setFormState,
    setIsSuccess,
    isCheckoutPlace,
    CustomerDetailsTitleComponent
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

  const toggleEditState = () => {
    toggleIsEdit()
    cleanFormState({ changes: {} })
  }

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
        <Container>
          {isModal && (
            <TitleContainer isAddressFormOpen={isAddressFormOpen && !isEdit}>
              {!isCheckoutPlace && (
                <ModalIcon>
                  <MdClose onClick={() => onClose()} />
                </ModalIcon>
              )}
              <h1>{t('CUSTOMER_DETAILS', 'Customer Details')}</h1>
            </TitleContainer>
          )}
          {!isCheckoutPlace && (
            <Header className='user-form'>
              {!isModal && (
                <>
                  {CustomerDetailsTitleComponent ? <CustomerDetailsTitleComponent /> : <h1>{t('CUSTOMER_DETAILS', 'Customer Details')}</h1>}
                </>
              )}
              {cartStatus !== 2 && isEdit && <FcCancel className='cancel' onClick={() => toggleEditState()} />}
            </Header>
          )}

          {!isEdit
            ? (
            <UserData>
              {(userData?.name || userData?.middle_name || userData?.lastname || userData?.second_lastname) && (
                <UserName>
                  {userData?.name} {userData?.middle_name} {userData?.lastname} {userData?.second_lastname}
                </UserName>
              )}
              {(userData?.email ?? userData?.guest_email) && (
                <p>{userData?.guest_id ? userData?.guest_email : userData?.email}</p>
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
              <ChangeCustomerText>
                {cartStatus !== 2 && (
                  <span onClick={() => toggleIsEdit()}>{t('CHANGE_USER_DETAILS', 'Change customer details')}</span>
                )}
              </ChangeCustomerText>
            </UserData>
              )
            : (
            <SideForm>
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
