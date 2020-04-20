# useNestedMatch

Currently with React Router V6 (still in alpha), using `activeClassName` on a top level `<NavLink>` on works with exact match.
This hook helps mitigate the issue until they rework the internal `useMatch` to work correctly against nested routes.

Example: https://codesandbox.io/s/react-router-v6-utility-function-usenestedmatch-44q73

#### How it works

`useNestedMatch(test: string, opts: { type: string; path: string })`

There are 2 `type` options available

1. "startsWith"
2. "endsWith"

They do exactly what they sound like they do. `startsWith` checks if the path starts with the test string and `endsWith` checks if the path name ends with the test string. If you don't pass a type param it will match against the entire path.

provide a path to check against, default is `''`. For now I just pass `pathname` you can retrieve from react-router-dom's `useLocation` hook.

#### Usage

```
npm install @imjakechapman/use-nested-match
```

or

```
yarn add @imjakechapman/use-nested-match
```

then

##### Examples

We have some some nested routers and a top level `NavLink` we want to stay active. import `useNestedMatch` and test against whatever your heart desires.

location.pathname `'/account/921808/somenestedroute/edit'`

```
import { useLocation } from 'react-router-dom'
import { useNestedMatch } from '@imjakechapman/use-nested-match'

const App = () => {
  const { pathname } = useLocation()

  // returns true
  const accountLinkActive = useNestedMatch('account', {
    type: 'startsWith',
    path: pathname
  })

  // returns false
  const settingsLinkActive = useNestedMatch('settings') // false

  // returns true
  const editLinkActive = useNestedMatch('edit', {
    type: 'endsWith',
    path: pathname
  })

  return (
    <NavLink className={
      classnames({ 'my-active-class': accountLinkActive })
    }>
      Account
    </NavLink>

    <NavLink className={
      classnames({ 'my-active-class': settingsLinkActive })
    }>
      Settings
    </NavLink>

    <NavLink className={
      classnames({ 'my-active-class': editLinkActive })
    }>
      Edit
    </NavLink>
  )
}
```
