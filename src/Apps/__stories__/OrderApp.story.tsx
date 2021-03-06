import { OrderWithShippingDetails } from "Apps/__test__/Fixtures/Order"
import { StorybooksRouter } from "Artsy/Router"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as orderRoutes } from "../Order/routes"

const mock = {
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
  Order: (_, { id, ...others }) => {
    return {
      ...OrderWithShippingDetails,
      id,
      ...others,
    }
  },
}

const Router = props => (
  <StorybooksRouter
    routes={orderRoutes}
    mockResolvers={mock}
    historyOptions={{ useBeforeUnload: true }}
    {...props}
  />
)

storiesOf("Apps/Order Page", module)
  .add("Shipping", () => <Router initialRoute="/order2/123/shipping" />)
  .add("Payment", () => <Router initialRoute="/order2/123/payment" />)
  .add("Review", () => <Router initialRoute="/order2/123/review" />)
  .add("Status", () => <Router initialRoute="/order2/123/status" />)
