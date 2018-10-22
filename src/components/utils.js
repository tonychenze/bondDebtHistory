import consts from "./consts";

export function isBreached(utilisation, breach) {
  return utilisation >= consts.breachRatio * breach;
}

export function isNearBreach(utilisation, breach) {
  return utilisation >= consts.nearBreachRatio * breach;
}

export default {
  isBreached,
  isNearBreach
};
