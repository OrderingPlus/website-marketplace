import React, { useEffect, useState } from 'react'
import {
  BubbleBusines,
  BubbleConsole,
  BubbleCustomer,
  ChatImage,
  MessageBusiness,
  MessageConsole,
  MessageContentWrapper,
  MessageCreatedDate,
  MessageCustomer,
  MyName,
  TimeofSent,
  TimeofSentByAdmin
} from './styles'

import { useLanguage, useSession, useUtils } from '~components'

import {
  capitalize
} from '~ui'

export const MapMessages = (props) => {
  const {
    order,
    filterSpecialStatus,
    hideAttributeStatus,
    handleModalImage,
    getLevel,
    business,
    driver,
    getLogisticTagStatus,
    getStatus
  } = props
  const [{ dictionary }, t] = useLanguage()
  const [{ parseDate, parseTime }] = useUtils()
  const [{ user }] = useSession()

  const [, setMessages] = useState(props.messages)
  const [messagesToShow, setMessagesToShow] = useState(props.messagesToShow)

  useEffect(() => {
    if (!props.messages?.messages?.length && !props.messagesToShow?.messages?.length) return
    const messages_ = {
      ...props.messages,
      messages: props.messages?.messages?.filter(msg => msg.type !== 1 && msg.type !== 0)
    }
    const messagesToShow_ = {
      ...props.messagesToShow,
      messages: props.messagesToShow?.messages?.filter(msg => msg.type !== 1 && msg.type !== 0)
    }

    setMessages(messages_)
    setMessagesToShow(messagesToShow_)
  }, [JSON.stringify(props.messages), JSON.stringify(props.messagesToShow)])

  return (
    <>
      {props?.messages?.messages.map((message) => (
        <React.Fragment key={message.id}>
          {message.type === 1 && message?.change?.attribute !== 'driver_group_id' && (
            <MessageContentWrapper key={message.id}>
              {message.change?.attribute !== 'driver_id'
                ? (
                  <>
                    {!hideAttributeStatus?.includes(message.change.attribute) && (
                      <>
                        <MessageCreatedDate>
                          <span>{parseDate(message.created_at, { outputFormat: 'MMM DD, YYYY' })}</span>
                        </MessageCreatedDate>
                        <MessageConsole>
                          <BubbleConsole>
                            {t('ORDER', 'Order')} {' '}
                            <strong>{t(message.change.attribute.toUpperCase(), capitalize(message.change.attribute.replace(/_/g, ' ')))}</strong> {' '}
                            {(message.change?.attribute !== 'manual_driver_assignment_comment' && message.change.old === null)
                              ? (<>{t('CHANGED_FROM', 'Changed from')} {' '}</>)
                              : (<>{t('CHANGED', 'Changed')} {' '}</>)
                            }
                            {filterSpecialStatus.includes(message.change.attribute)
                              ? (
                                <>
                                  {message.change.old === null
                                    ? <strong>0</strong>
                                    : (<><strong>{message.change.old}</strong> {' '}</>)
                                  }
                                  <>{t('TO', 'to')} {' '} <strong>{message.change.new}</strong> {t('MINUTES', 'Minutes')}</>
                                </>
                                )
                              : (
                                <>
                                  {message.change.old !== null && (
                                    <>
                                      <strong>{message.change?.attribute === 'logistic_status' ? getLogisticTagStatus(parseInt(message.change.old, 10)) : getStatus(parseInt(message.change.old, 10), dictionary)}</strong> {' '}
                                    </>
                                  )}
                                  <> {t('TO', 'to')} {' '} <strong>{message.change?.attribute === 'logistic_status' ? getLogisticTagStatus(parseInt(message.change.new, 10)) : message.change?.attribute === 'manual_driver_assignment_comment' ? message.change.new : getStatus(parseInt(message.change.new, 10), dictionary)}</strong> </>
                                </>
                                )}
                            <TimeofSent>{parseTime(message.created_at)}</TimeofSent>
                          </BubbleConsole>
                        </MessageConsole>
                      </>
                    )}
                  </>
                  )
                : (
                  <>
                    <MessageCreatedDate>
                      <span>{parseDate(message.created_at, { outputFormat: 'MMM DD, YYYY' })}</span>
                    </MessageCreatedDate>
                    <MessageConsole>
                      <BubbleConsole>
                        {message.change.new
                          ? (
                          <>
                            <strong>{message.driver?.name} {' '} {message.driver?.lastname && message.driver.lastname} </strong>
                            {t('WAS_ASSIGNED_AS_DRIVER', 'Was assigned as driver')}
                            {message.comment && (<><br /> {message.comment.length}</>)}
                          </>
                            )
                          : <>{t('DRIVER_UNASSIGNED', 'Driver unassigned')}</>}
                        <TimeofSent>{parseTime(message.created_at)}</TimeofSent>
                      </BubbleConsole>
                    </MessageConsole>
                  </>
                  )}
            </MessageContentWrapper>

          )}
          {(messagesToShow?.messages?.length || (message?.can_see?.includes('2') && business) || (message?.can_see?.includes('4') && driver)) && (
            <>
              {message.type === 2 && user?.id === message.author_id && (
                <MessageContentWrapper>
                  <MessageCreatedDate>
                    <span>{parseDate(message.created_at, { outputFormat: 'MMM DD, YYYY' })}</span>
                  </MessageCreatedDate>
                  <MessageCustomer>
                    <BubbleCustomer>
                      <strong>
                        <MyName>
                          {message.author.name} ({order.customer_id === message.author.id ? getLevel(3) : getLevel(message.author.level)})
                        </MyName>
                      </strong>
                      {message.comment}
                      <TimeofSent>{parseTime(message.created_at)}</TimeofSent>
                    </BubbleCustomer>
                  </MessageCustomer>
                </MessageContentWrapper>
              )}
              {message.type === 3 && user.id === message.author_id && (
                <MessageContentWrapper>
                  <MessageCreatedDate>
                    <span>{parseDate(message.created_at, { outputFormat: 'MMM DD, YYYY' })}</span>
                  </MessageCreatedDate>
                  <MessageCustomer>
                    <BubbleCustomer name='image'>
                      <strong>
                        <MyName>
                          {message.author.name} ({order.customer_id === message.author.id ? getLevel(3) : getLevel(message.author.level)})
                        </MyName>
                      </strong>
                      <ChatImage><img src={message.source} onClick={() => handleModalImage(message.source)} alt='chat-image' width='168px' height='300px' /></ChatImage>
                      {message.comment && (
                        <>
                          {message.comment}
                        </>
                      )}
                      <TimeofSent>{parseTime(message.created_at)}</TimeofSent>
                    </BubbleCustomer>
                  </MessageCustomer>
                </MessageContentWrapper>

              )}
              {message.type === 2 && user?.id !== message.author_id && (
                <MessageContentWrapper>
                  <MessageCreatedDate>
                    <span>{parseDate(message.created_at, { outputFormat: 'MMM DD, YYYY' })}</span>
                  </MessageCreatedDate>
                  <MessageBusiness>
                    <BubbleBusines>
                      <strong>
                        <MyName>
                          {message.author.name} ({order.customer_id === message.author.id ? getLevel(3) : getLevel(message.author.level)})
                        </MyName>
                      </strong>
                      {message.comment}
                      <TimeofSentByAdmin>{parseTime(message.created_at)}</TimeofSentByAdmin>
                    </BubbleBusines>
                  </MessageBusiness>
                </MessageContentWrapper>
              )}
              {message.type === 3 && user.id !== message.author_id && (
                <MessageContentWrapper>
                  <MessageCreatedDate>
                    <span>{parseDate(message.created_at, { outputFormat: 'MMM DD, YYYY' })}</span>
                  </MessageCreatedDate>
                  <MessageBusiness>
                    <BubbleBusines name='image'>
                      <strong>
                        <MyName>
                          {message.author.name} ({order.customer_id === message.author.id ? getLevel(3) : getLevel(message.author.level)})
                        </MyName>
                      </strong>
                      <ChatImage><img src={message.source} onClick={() => handleModalImage(message.source)} alt='chat-image' width='168px' height='300px' /></ChatImage>
                      {message.comment && (
                        <>
                          {message.comment}
                        </>
                      )}
                      <TimeofSent>{parseTime(message.created_at)}</TimeofSent>
                    </BubbleBusines>
                  </MessageBusiness>
                </MessageContentWrapper>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
