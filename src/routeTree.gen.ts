/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as publicPublicImport } from './routes/(public)/_public'
import { Route as authAuthImport } from './routes/(auth)/_auth'
import { Route as authAuthIndexImport } from './routes/(auth)/_auth.index'
import { Route as publicPublicRegisterImport } from './routes/(public)/_public.register'
import { Route as publicPublicLoginImport } from './routes/(public)/_public.login'
import { Route as authAuthItemItemIdImport } from './routes/(auth)/_auth.item.$itemId'

// Create Virtual Routes

const publicImport = createFileRoute('/(public)')()
const authImport = createFileRoute('/(auth)')()

// Create/Update Routes

const publicRoute = publicImport.update({
  id: '/(public)',
  getParentRoute: () => rootRoute,
} as any)

const authRoute = authImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const publicPublicRoute = publicPublicImport.update({
  id: '/_public',
  getParentRoute: () => publicRoute,
} as any)

const authAuthRoute = authAuthImport.update({
  id: '/_auth',
  getParentRoute: () => authRoute,
} as any)

const authAuthIndexRoute = authAuthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => authAuthRoute,
} as any)

const publicPublicRegisterRoute = publicPublicRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => publicPublicRoute,
} as any)

const publicPublicLoginRoute = publicPublicLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => publicPublicRoute,
} as any)

const authAuthItemItemIdRoute = authAuthItemItemIdImport.update({
  id: '/item/$itemId',
  path: '/item/$itemId',
  getParentRoute: () => authAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth': {
      id: '/(auth)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthImport
      parentRoute: typeof authRoute
    }
    '/(public)': {
      id: '/(public)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof publicImport
      parentRoute: typeof rootRoute
    }
    '/(public)/_public': {
      id: '/(public)/_public'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof publicPublicImport
      parentRoute: typeof publicRoute
    }
    '/(public)/_public/login': {
      id: '/(public)/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof publicPublicLoginImport
      parentRoute: typeof publicPublicImport
    }
    '/(public)/_public/register': {
      id: '/(public)/_public/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof publicPublicRegisterImport
      parentRoute: typeof publicPublicImport
    }
    '/(auth)/_auth/': {
      id: '/(auth)/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthIndexImport
      parentRoute: typeof authAuthImport
    }
    '/(auth)/_auth/item/$itemId': {
      id: '/(auth)/_auth/item/$itemId'
      path: '/item/$itemId'
      fullPath: '/item/$itemId'
      preLoaderRoute: typeof authAuthItemItemIdImport
      parentRoute: typeof authAuthImport
    }
  }
}

// Create and export the route tree

interface authAuthRouteChildren {
  authAuthIndexRoute: typeof authAuthIndexRoute
  authAuthItemItemIdRoute: typeof authAuthItemItemIdRoute
}

const authAuthRouteChildren: authAuthRouteChildren = {
  authAuthIndexRoute: authAuthIndexRoute,
  authAuthItemItemIdRoute: authAuthItemItemIdRoute,
}

const authAuthRouteWithChildren = authAuthRoute._addFileChildren(
  authAuthRouteChildren,
)

interface authRouteChildren {
  authAuthRoute: typeof authAuthRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authAuthRoute: authAuthRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

interface publicPublicRouteChildren {
  publicPublicLoginRoute: typeof publicPublicLoginRoute
  publicPublicRegisterRoute: typeof publicPublicRegisterRoute
}

const publicPublicRouteChildren: publicPublicRouteChildren = {
  publicPublicLoginRoute: publicPublicLoginRoute,
  publicPublicRegisterRoute: publicPublicRegisterRoute,
}

const publicPublicRouteWithChildren = publicPublicRoute._addFileChildren(
  publicPublicRouteChildren,
)

interface publicRouteChildren {
  publicPublicRoute: typeof publicPublicRouteWithChildren
}

const publicRouteChildren: publicRouteChildren = {
  publicPublicRoute: publicPublicRouteWithChildren,
}

const publicRouteWithChildren =
  publicRoute._addFileChildren(publicRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof authAuthIndexRoute
  '/login': typeof publicPublicLoginRoute
  '/register': typeof publicPublicRegisterRoute
  '/item/$itemId': typeof authAuthItemItemIdRoute
}

export interface FileRoutesByTo {
  '/': typeof authAuthIndexRoute
  '/login': typeof publicPublicLoginRoute
  '/register': typeof publicPublicRegisterRoute
  '/item/$itemId': typeof authAuthItemItemIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/(public)': typeof publicRouteWithChildren
  '/(public)/_public': typeof publicPublicRouteWithChildren
  '/(public)/_public/login': typeof publicPublicLoginRoute
  '/(public)/_public/register': typeof publicPublicRegisterRoute
  '/(auth)/_auth/': typeof authAuthIndexRoute
  '/(auth)/_auth/item/$itemId': typeof authAuthItemItemIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/register' | '/item/$itemId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/register' | '/item/$itemId'
  id:
    | '__root__'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/(public)'
    | '/(public)/_public'
    | '/(public)/_public/login'
    | '/(public)/_public/register'
    | '/(auth)/_auth/'
    | '/(auth)/_auth/item/$itemId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  authRoute: typeof authRouteWithChildren
  publicRoute: typeof publicRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  authRoute: authRouteWithChildren,
  publicRoute: publicRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(auth)",
        "/(public)"
      ]
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_auth"
      ]
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_auth/",
        "/(auth)/_auth/item/$itemId"
      ]
    },
    "/(public)": {
      "filePath": "(public)",
      "children": [
        "/(public)/_public"
      ]
    },
    "/(public)/_public": {
      "filePath": "(public)/_public.tsx",
      "parent": "/(public)",
      "children": [
        "/(public)/_public/login",
        "/(public)/_public/register"
      ]
    },
    "/(public)/_public/login": {
      "filePath": "(public)/_public.login.tsx",
      "parent": "/(public)/_public"
    },
    "/(public)/_public/register": {
      "filePath": "(public)/_public.register.tsx",
      "parent": "/(public)/_public"
    },
    "/(auth)/_auth/": {
      "filePath": "(auth)/_auth.index.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/item/$itemId": {
      "filePath": "(auth)/_auth.item.$itemId.tsx",
      "parent": "/(auth)/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
