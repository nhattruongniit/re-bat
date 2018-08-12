// @flow
import * as React from 'react'

export type Props = {
  initialState?: Object,
  children?: React$Node
}

export type State = {
  [string]: any
}

type GlobalProps = {
  [string]: any
}

export type SetState = (
  key: string,
  value: any,
  callback: () => void
) => void

export type CurrentComponent = any => void

type Provider = React$ComponentType<*>

export type WithProvider = (
  initialState: State,
  GlobalProvider: Provider,
  currentComponent: CurrentComponent
) => React$ComponentType<*>

type Consumer = React$ComponentType<{
  children: (state: State | void) => React$Node,
}>

export type Dispatch = (
  type: string,
  key: string
) => any => void

type MapStateToProps = (state?: State, props?: GlobalProps) => GlobalProps
type MapDispatchToProps = (dispatch?: Dispatch) => GlobalProps

export type WithConnect = (
  Consumer: Consumer,
  dispatch: Dispatch
) => (
  mapStateToProps: MapStateToProps,
  mapDispatchToProps: MapDispatchToProps
)  => (Component: React$ComponentType<*>) => (props: GlobalProps) => any

export type Context = {
  Consumer: Consumer,
  Provider: Provider
}

export type GetState = () => State

export type Subscribe = (
  listener: Function
) => Function

type Store = {
  Provider: any,
  connect: any,
  dispatch: Dispatch,
  subscribe: Subscribe,
  getState: GetState
}

export type CreateStore = (
  globalConfig: Object
) => Store
