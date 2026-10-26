export type ListingFields={transaction?:'sale'|'let';sector?:'residential'|'commercial';rentPeriod?:'pcm'|'pw'|'pa';price:number;status:string};
export const propertySections=[
 {id:'to-let/residential',title:'Residential to let',transaction:'let',sector:'residential',service:'Residential lettings',intro:'Find a home to rent in London, or speak to Abdhool about letting your residential property.'},
 {id:'to-let/commercial',title:'Commercial to let',transaction:'let',sector:'commercial',service:'Commercial lettings',intro:'Looking for business premises or a tenant for your commercial property? Talk to Abdhool about your requirements.'},
 {id:'for-sale/residential',title:'Residential for sale',transaction:'sale',sector:'residential',service:'Residential sales',intro:'Explore homes for sale in London, or discuss selling your residential property with Abdhool.'},
 {id:'for-sale/commercial',title:'Commercial for sale',transaction:'sale',sector:'commercial',service:'Commercial sales',intro:'Explore commercial property opportunities, or speak to Abdhool about selling your business premises.'}
] as const;
export type PropertySection=typeof propertySections[number];
export const transactionOf=(p:ListingFields)=>p.transaction??'sale';
export const sectorOf=(p:ListingFields)=>p.sector??'residential';
export const sectionOf=(p:ListingFields)=>propertySections.find(s=>s.transaction===transactionOf(p)&&s.sector===sectorOf(p))!;
export const matchesSection=(p:ListingFields,s:PropertySection)=>transactionOf(p)===s.transaction&&sectorOf(p)===s.sector;
export const listingStatuses=(transaction:string)=>transaction==='let'?['To let','Under offer','Let agreed','Let']:['For sale','Under offer','Sold'];
export function priceText(p:ListingFields){const amount=new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(p.price);return amount+(transactionOf(p)==='let'?' '+({pcm:'pcm',pw:'per week',pa:'per year'}[p.rentPeriod??'pcm']):'');}
export function monthlyRent(p:ListingFields){return p.rentPeriod==='pa'?p.price/12:p.rentPeriod==='pw'?p.price*52/12:p.price;}
export const enquiryServices=['Selling','Buying','Valuation','Residential lettings','Commercial lettings','Residential sales','Commercial sales','Property advice','General enquiry'];
