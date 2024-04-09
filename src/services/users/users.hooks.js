const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const authHooks = require('feathers-authentication-hooks');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;

const restrict = [
  authenticate('config.strategies'),
    restrictToOwner({
      idField: 'username',
      ownerField: 'username'
    })
];

const restrictByRole = [
  authenticate('config.strategies'),
  authHooks.hasRoleOrRestrict({
    roles: ['admin'],
    restrict: {public:true}
  })
];

module.exports = {
  before: {
    all: [],
    find: [ authenticate('config.strategies') ],
    get: [ ...restrict ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
