import React, {Component} from 'react'
import renderer from 'react-test-renderer'
import createStore from '../re-bat'
import { shallow } from 'enzyme';

import 'jest-enzyme';
let store;

beforeEach(()=>{

  const globalConfig = {
      root: {
        module1: {
          initialState: {
            count: 0,
          },
          actions: {
            increment: ({ state }) => ({ ...state, count: state.count + 1 }),
            decrement: ({ state }) => ({ ...state, count: state.count - 1})
          },
        }
      }
    }
    store = createStore(globalConfig)
})



describe('Re-Bat', () => {


  it('create Store', () => {
    const returns = Object.keys(store)

    expect(returns.length).toBe(5)
    expect(returns).toContain('Provider')
    expect(returns).toContain('connect')
    expect(returns).toContain('subscribe')
    expect(returns).toContain('dispatch')
    expect(returns).toContain('getState')

  })

  it('<Provider /> is stored data', () => {
    const { Provider } = store

    const wrapper = shallow(<Provider>
      <div>Children</div>
    </Provider>);

    expect(wrapper.state().module1.count).toEqual(0);

  })

  it('connect can get data from <Provider />', () => {
    const { Provider, connect } = store

    let Count = ({count}) => <div>{count}</div>
    Count = connect((state) => ({...state.module1}))(Count)

    const tree = renderer.create(<Provider>
      <div>
        <Count/>
      </div>
    </Provider>);

    expect(tree.toJSON()).toMatchSnapshot()

  })

  it('Dispatch function can change data from <Provider/>', () => {
    const { Provider, connect, dispatch } = store

    let Count = ({count}) => <div>{count}</div>
    Count = connect((state) => ({...state.module1}))(Count)

    const tree = renderer.create(<Provider>
      <div>
        <Count/>
      </div>
    </Provider>);

    expect(tree.toJSON()).toMatchSnapshot()

    dispatch('increment', 'module1')()
    dispatch('increment', 'module1')()

    expect(tree.toJSON()).toMatchSnapshot()

    dispatch('decrement', 'module1')()

    expect(tree.toJSON()).toMatchSnapshot()

  })

  it('Dispatch function show error when key and actions is not defined', () => {
    const { Provider, connect, dispatch } = store

    let Count = ({count}) => <div>{count}</div>
    Count = connect((state) => ({...state.module1}))(Count)

    const tree = renderer.create(<Provider>
      <div>
        <Count/>
      </div>
    </Provider>);

    dispatch('increment', 'module2')()
    dispatch('increment', 12)()

  })

  it('Call subscribe function when dispatch event', () => {
    const { Provider, connect, dispatch, subscribe } = store

    class Count extends Component {
      componentDidMount(){
        this.unSubscrire = subscribe(({getState}) => console.log(getState()))
      }

      componentWillUnmount(){
        this.unSubscrire()
      }
      render(){
        return <div>{this.props.count}</div>
      }
    }

    Count = connect((state) => ({...state.module1}))(Count)

    const tree = renderer.create(<Provider>
      <div>
        <Count/>
      </div>
    </Provider>);

    dispatch('increment', 'module1')()


  })

  it('Support call multiple subscribe function', () => {
    const { Provider, connect, dispatch, subscribe } = store

    const tree = renderer.create(<Provider>
      <div>
        Children
      </div>
    </Provider>);

    const uS1 = subscribe(()=> console.log("Subscribe 1"))
    const uS2 = subscribe(()=> console.log("Subscribe 2"))
    const uS3 = subscribe(()=> console.log("Subscribe 3"))


    dispatch('increment', 'module1')()

    uS1()
    uS2()
    uS3()

  })

  it('getState() return currentState', () => {
    const { Provider, connect, dispatch, subscribe, getState } = store

    const tree = renderer.create(<Provider>
      <div>
        Children
      </div>
    </Provider>);

    expect(getState().module1.count).toEqual(0)
    dispatch('increment', 'module1')()
    dispatch('increment', 'module1')()

    expect(getState().module1.count).toEqual(2)

    dispatch('decrement', 'module1')()

    expect(getState().module1.count).toEqual(1)

  })




})
