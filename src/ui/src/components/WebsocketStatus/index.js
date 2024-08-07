import React, { useState, useEffect } from 'react'
import { InfoCircle } from 'react-bootstrap-icons'

import {
  Contatiner,
  StatusContainer,
  WebsocketStatusDot,
  InfoWrapper,
  InfoContent,
  DetailContainer,
  StatusItemWrapper,
  ButtonsContainer,
  ButtonWrapper
} from './styles'

import { useLanguage, useUtils, WebsocketStatus as WebsocketStatusController, useConfig } from '~components'
import {
  Alert,
  Modal,
  IconButton,
  Button
} from '~ui'

const SocketStatusUI = (props) => {
  const {
    socketStatus,
    reconnectAttemptCount,
    connectedDate
  } = props

  const [, t] = useLanguage()
  const [{ parseDate }] = useUtils()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [openModal, setOpenModal] = useState(false)
  const [{ configs }] = useConfig()
  const isEnabledBtn = configs?.white_label_module?.value

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
    window.location.reload()
  }

  useEffect(() => {
    if (reconnectAttemptCount > 3) {
      setAlertState({
        open: true,
        content: t('WEBSOCKET_CONNECT_ERROR', 'There appears to be an error in establishing the WebSocket connection. Please try reloading the page to resolve the issue.')
      })
    }
  }, [reconnectAttemptCount])

  return (
    <Contatiner>
      <InfoWrapper>
        <IconButton
          color='primary'
        >
          <InfoCircle />
        </IconButton>
        <InfoContent>
          {isEnabledBtn
            ? (
                t('WEBSOCKET_STATUS_INFO_WITHOUT_LINK', 'Verify the server connection by date and time using the Connection status button. Press update to refresh you dashboard and update the status as well. Need help? Contact our Customer support team.')
              )
            : (
                t('WEBSOCKET_STATUS_APP_INFO', 'Verify the server connection by date and time using the Connection status button. Press update to refresh your app and update the status as well. Need help? Contact our Customer support team here:')
              )}
          {!isEnabledBtn && <a href='https://www.orderingplus.com/contact-us' target='_blank' rel='noopener noreferrer'>{t('CUSTOMER_SUPPORT', 'Customer support')}</a>}
        </InfoContent>
      </InfoWrapper>
      <ButtonWrapper>
        <Button
          borderRadius='8px'
          color='secundary'
          onClick={() => setOpenModal(true)}
        >
          <StatusContainer>
            <p>{t('CONNECTION_STATUS', 'Connection status')}</p>
            <WebsocketStatusDot
              status={socketStatus}
            />
          </StatusContainer>
        </Button>
      </ButtonWrapper>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          width='500px'
          title={t('CONNECTION_STATUS', 'Connection status')}
        >
          <DetailContainer>
            <p>{t('LAST_UPDATE', 'Last update')}: {parseDate(connectedDate)}</p>
            <StatusItemWrapper>
              <div>
                <WebsocketStatusDot status={1} />
                <span>{t('OK', 'Ok')}</span>
              </div>
              <p>{t('WEBSOCKET_OK', 'The websocket works normally.')}</p>
            </StatusItemWrapper>
            <StatusItemWrapper>
              <div>
                <WebsocketStatusDot status={0} />
                <span>{t('CONNECTING', 'Connecting')}</span>
              </div>
              <p>{t('WEBSOCKET_CONNECTING', 'The websocket is connecting.')}</p>
            </StatusItemWrapper>
            <StatusItemWrapper>
              <div>
                <WebsocketStatusDot status={2} />
                <span>{t('DISCONNECTED', 'Disconnected')}</span>
              </div>
              <p>{t('WEBSOCKET_DISCONNECTED', 'The server is slow, please reload.')}</p>
            </StatusItemWrapper>
            <ButtonsContainer>
              <Button
                color='secundary'
                onClick={() => setOpenModal(false)}
              >
                {t('CLOSE', 'Close')}
              </Button>
              <Button
                color='primary'
                onClick={() => window.location.reload()}
              >
                {t('UPDATE', 'Update')}
              </Button>
            </ButtonsContainer>
          </DetailContainer>
        </Modal>
      )}

      <Alert
        title={t('ERROR', 'Error')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </Contatiner>
  )
}

export const WebsocketStatus = (props) => {
  const socketProps = {
    ...props,
    UIComponent: SocketStatusUI
  }
  return <WebsocketStatusController {...socketProps} />
}
