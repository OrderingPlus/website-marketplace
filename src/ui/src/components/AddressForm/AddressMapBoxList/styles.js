import styled from 'styled-components'

export const AddressMapBoxListContainer = styled.div`
  background: #fff;
  position: absolute;
  width: 100%;
  top: 60px;
  z-index: 1000;
`

export const AddressSuggestContainer = styled.div`
  border-bottom: 1px solid #bbb;
  cursor: pointer;
  display: flex;
  position: relative;
  &:hover {
    background: #ddd;
  }
  > svg {
    position: relative;
    top: 6px;
    left: 5px;
    color: #bbb;
  }
  p {
    margin: 0;
    padding: 5px;
    margin-left: 10px;
  }
`
