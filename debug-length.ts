
import { STAKEHOLDER_DATA } from './lib/data/stakeholders-data';

console.log('Total Stakeholders in Data File:', STAKEHOLDER_DATA.stakeholders.length);
console.log('First Stakeholder:', STAKEHOLDER_DATA.stakeholders[0].id);
console.log('Last Stakeholder:', STAKEHOLDER_DATA.stakeholders[STAKEHOLDER_DATA.stakeholders.length - 1].id);
