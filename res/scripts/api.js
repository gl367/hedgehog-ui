if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://10.128.21.31:8545"));
}
var eth = web3.eth;

var registryAbi  = [{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"executeOption","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"strike","type":"uint256"}],"name":"calculateCollateral","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferETH","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"market","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"typeID","type":"uint256"},{"name":"quantity","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"commodity","type":"string"}],"name":"writeOption","outputs":[{"name":"id","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"to","type":"address"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"depositETH","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"ID","type":"uint256"}],"name":"getOptionInfo","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"pricefeed","type":"address"}],"type":"constructor"}];
var registryAddr = "0x32cf1f3a98aeaf57b88b3740875d19912a522c1a";
var marketAbi = [{"constant":false,"inputs":[{"name":"orderID","type":"uint256"},{"name":"isCall","type":"bool"},{"name":"isBid","type":"bool"}],"name":"fillOrder","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"filledOrders","outputs":[{"name":"isCall","type":"bool"},{"name":"owner","type":"address"},{"name":"orderID","type":"uint256"},{"name":"commodity","type":"string"},{"name":"quantity","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"orderPrice","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"isFilled","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"isCall","type":"bool"},{"name":"isBid","type":"bool"},{"name":"commodity","type":"string"},{"name":"quantity","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"orderPrice","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"uid","type":"uint256"}],"name":"placeOrder","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"putBids","outputs":[{"name":"isCall","type":"bool"},{"name":"owner","type":"address"},{"name":"orderID","type":"uint256"},{"name":"commodity","type":"string"},{"name":"quantity","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"orderPrice","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"isFilled","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"callBids","outputs":[{"name":"isCall","type":"bool"},{"name":"owner","type":"address"},{"name":"orderID","type":"uint256"},{"name":"commodity","type":"string"},{"name":"quantity","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"orderPrice","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"isFilled","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"},{"name":"isCall","type":"bool"},{"name":"isBid","type":"bool"}],"name":"getOrderInfoByIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"isCall","type":"bool"},{"name":"isBid","type":"bool"}],"name":"getBookSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"orderID","type":"uint256"},{"name":"isCall","type":"bool"},{"name":"isBid","type":"bool"}],"name":"getOrderInfo","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"putAsks","outputs":[{"name":"isCall","type":"bool"},{"name":"owner","type":"address"},{"name":"orderID","type":"uint256"},{"name":"commodity","type":"string"},{"name":"quantity","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"orderPrice","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"isFilled","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"callAsks","outputs":[{"name":"isCall","type":"bool"},{"name":"owner","type":"address"},{"name":"orderID","type":"uint256"},{"name":"commodity","type":"string"},{"name":"quantity","type":"uint256"},{"name":"strikePrice","type":"uint256"},{"name":"orderPrice","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"isFilled","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderID","type":"uint256"},{"indexed":false,"name":"optionID","type":"uint256"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"writer","type":"address"},{"indexed":false,"name":"commodity","type":"string"}],"name":"OrderFilled","type":"event"}];
var marketAddr = "0xa188fc44ccd557135af22bf1701a5083e6fe06f2";
var priceAbi = [{"constant":false,"inputs":[{"name":"commodity","type":"string"},{"name":"price","type":"uint256"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"transferOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"commodity","type":"string"}],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lastUpdated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}];
var priceAddr = "0xd3aa556287afe63102e5797bfddd2a1e8dbb3ea5";

var registry = eth.contract(registryAbi).at(registryAddr);
var market = eth.contract(marketAbi).at(marketAddr);
var priceFeed = eth.contract(priceAbi).at(priceAddr);

function fetchOrders(isCall, isBid){
  var orders = [];
  var len = market.getBookSize(isCall, isBid);
  for(var i = 0; i < len; i++){
    var v = market.getOrderInfoByIndex.call(i, isCall, isBid);
    console.log(v);
    orders.push(v);
  }
  return orders;
}

function getOpen(strikePrice, orders){
  var open = orders; // TODO
  //var open = orders.filter(function(order){return !order[6]});
  if(strikePrice != -1){
    open = open.filter(function(order){return order[2] == strikePrice});
  }
  return open;
}
// get min cost  from strike_low to strike_high
function openCalls(strike_low, strike_high) {
  var callAskOrders = fetchOrders(true, false);
  var call_arr = [];

  for (var i = strike_low; i++; i <= strike_high) {
    var open_callAskOrders = getOpen(i,callAskOrders);
    var cleaned = [];
    for (var j = 0; j < open_callAskOrders.length; i++) {
      cleaned.push(open_callAskOrders[j][3])
    }
    call_arr[i-strike_low] = Math.min.apply(null, cleaned); // get lowest cost
  }
  return call_arr;

}

function openPuts(strike_low, strike_high) {
  var putAskOrders = fetchOrders(false, false);
  var put_arr = [];

  for (var i = strike_low; i++; i <= strike_high) {
    var open_putAskOrders = getOpen(i,putAskOrders);
    var cleaned = [];
    for (var j = 0; j < open_putAskOrders.length; i++) {
      cleaned.push(open_putAskOrders[j][3])
    }
    put_arr[i-strike_low] = Math.min.apply(null, cleaned); // get lowest cost
  }
}
// function api_main(strike_low, strike_high) { // strike_low, strike_high in dollars
//   var callAskOrders = fetchOrders(true, false);
//   var putAskOrders = fetchOrders(false, false);

//   call_arr = [];
//   put_arr = [];

//   for (var i = strike_low*100; i  = i+100; i <= strike_high*100) {
//     var open_callAskOrders = getOpen(i,callAskOrders);
//     var open_putAskOrders = getOpen(i,putAskOrders);

//     call_arr[i-9] = Math.min.apply(null, open_callAskOrders);
//     put_arr[i-9] = Math.min.apply(null, open_putAskOrders);
//     return [call_arr, put_arr];
//   }

// }
