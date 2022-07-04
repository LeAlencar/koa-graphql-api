import { createLoader } from "@entria/graphql-mongo-helpers";

import TransactionModel from "./TransactionModel";

import { transactionFilterMapping } from "./TransactionFilterInputType";

import { registerLoader } from "../../graphql/loaderRegister";

const {
  Wrapper: Transaction,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: TransactionModel,
  loaderName: "TransactionLoader",
  filterMapping: transactionFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Transaction;

registerLoader("TransactionLoader", getLoader);