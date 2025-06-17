# Bol categories filter

## Prerequisites

- Install Nodejs. latest I used `pnpm` to scafolled this project. You can read [here](https://medium.com/@sajanvtech/you-should-switch-to-pnpm-now-1d08c57f821b) to install `pnpm` if you are interested. But `pnpm` it is not mandatory

## Frontend architecture

I always go with a feature based component architecture in React it is an organizational pattern where your project structure is grouped by feature or domain instead by it's file type like components, services, styles in separate folders.

It helps scalability, maintainability, and separation of concerns, especially for larger applications.

It is well known in the larger applications and enterpise companies. You may have heard of it like clean architecture.

## Decisions

**Tech Stack**

React.js, scaffolded with Vite and TypeScript for a fast and type-safe development experience.

- Tailwind CSS for utility-first, responsive styling.
- Apollo Client for data fetching from a GraphQL server I built using Node.js.
- Vite and Storybook for testing and UI component development.
- Other essential frontend setup and best practices such as linting etc..
- For icons i use `@tabler/icons` however, i used `ReactSVG` libary to load the search icon provided by you. Also, showcased `@tabler/icons` usage in the bagde component. 

**Backend API (GraphQL)**

To meet your requirements, I created a lightweight Apollo GraphQL server, deployed on my personal low performance server: [Graphql Endpoint](https://gql.dev.sajankumarv.tech/graphql)

**API supports**

```graphql
query ($searchTerm: String!) {
    categories
    searchCategories(searchTerm: $searchTerm)
}
```

- categories: returns a list of all category strings.
- searchCategories: supports filtering based on a search term.

**Architecture & State Management**

The goal was to demonstrate clean frontend architecture and scalable code patterns:

- I used React Context API to manage shared state.
- Designed a generic filter component that relies on parent-driven behavior.
- For state persistence, I used URL search parameters to reflect the app’s state useful for deep linking and shareable URLs.
- In a production-grade app, I’d prefer using React Router or Next.js App Router for better route/state syncing.
  In this demo, I used the `native history.pushState()` API for simplicity.

**On State Persistence**

You suggested using localStorage or sessionStorage. While those work for simple use cases, I believe they are not ideal for more complex or large scale data persistence because:

- They are synchronous, blocking the main thread.
- They are better suited for lightweight, short-term storage.

For real-world applications, I recommend:

- IndexedDB for efficient, asynchronous browser based storage.
- Paired with Legend-State, one of the fastest state management libraries
  with support for local first architecture and data sync via TanStack Query.

**If interested**

- Legend state management [Read here](https://legendapp.com/open-source/state/v3/).
- What is local first apporach:
  [check here](https://legendapp.com/open-source/state/v3/sync/tanstack-query/)

I have used this setup in my current production projects. It is charming!

**Final Notes**

The code includes comments explaining key dummy decisions why did it in a way for this demo.

- My main focus was on code readability, modularity, and scalability.
- I avoided unnecessary abstractions while keeping the project flexible for future enhancements.
- I haven't used lazy loading to fetch categories for this demo but in production app it should be used. 
- I am new to story book testing so i read storybook integration documentation and setup it something decent.
- I am fan of MSW mocker and react testing library along with vitest but i want to try storybook testing because it is new for me
- You might notice some bug with filtering i am completely aware of that, but I think its fine for this demo.
- NOT Important: However, if you'd like to see a small apollo server i used for this demo [check here](https://github.com/sajanv88/simple-graphql#) PS: no typescript

## How to run

After your complete my "Prerequisites" follow the below step:

```bash
cd filter-bol && pnpm install #feel free to use npm, yarn or whatever you prefer
```

**Supported commands**

```bash

pnpm dev            #To start vite dev server
pnpm compile        #To generate graphql types using codegen
pnpm watch          #This will watch graphql-codegen

pnpm build          #This will check linting and run vite build
pnpm lint           #Checking code linting
pnpm lint:fix       #This will apply potential fixes.
pnpm format         #This will format the code
pnpm format:check   #This will check the format
pnpm storybook      #This will start the storybook playground


```

## Thank you

I'd like to thank you for the opportunity to showcase my frontend development skills. I hope you found something valuable or new in my approach because I certainly learned something new through this task as well. I'll continue deepening my knowledge, especially around Storybook
testing. Thanks again!
