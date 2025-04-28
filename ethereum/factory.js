import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6b0bAd1f9d663333796079276554720eC623Cc26'
);

export default instance;
