import * as React from 'react';

// Gatsby pageContext for the current page, made available to shared components (e.g. the
// header's language switcher, which needs a news post's translated counterpart).
const PageContext = React.createContext({});

export const usePageContext = () => React.useContext(PageContext);

export function wrapWithPageContext({ element, props }) {
  return <PageContext.Provider value={props.pageContext || {}}>{element}</PageContext.Provider>;
}
