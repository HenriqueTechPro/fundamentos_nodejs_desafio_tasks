// /tasks/:id/
//Regex uma expressão regular
export function buildRoutePath(path){
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParametersRegex = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') 

  
  const pathRegex = new RegExp(`^${pathWithParametersRegex}(?<query>\\?(.*))?$`)
   return pathRegex
}