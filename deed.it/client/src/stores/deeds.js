const deeds = [
  {
    id: 1,
    display: 'Deed 1',
    description: 'Deed 1 is a very good deed, a very good deed indeed, in fact an exemplary deed.',
    image: 'deed1.jpeg',
    reward: 5
  },
  {
    id: 2,
    display: 'Deed 2',
    description: 'Deed 2 is a weird deed, a deed for weird-deed-doers to do.',
    image: 'deed2.jpeg',
    reward: 10
  },
  {
    id: 3,
    display: 'Deed 3',
    description: 'Deed 3 de-de-de, there be a ditty there.',
    image: 'deed3.jpeg',
    reward: 7
  }
];

const getAvailableDeeds = () => deeds;

const getDeed = (id) => deeds[id - 1];

export {
  getAvailableDeeds,
  getDeed
}