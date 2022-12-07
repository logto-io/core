# Change Log

## 1.0.0-beta.16

### Patch Changes

- 38970fb8: Fix a Sign-in experience bug that may block some users to sign in.
- Updated dependencies [38970fb8]
  - @logto/phrases@1.0.0-beta.16

## 1.0.0-beta.15

### Patch Changes

- Bump connector kit version to fix "Continue" issues on sending email/sms.

## 1.0.0-beta.14

### Patch Changes

- 2d45cc3e: Update alteration script names after versioning

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies [68f2d56a]
  - @logto/phrases@1.0.0-beta.13
  - @logto/phrases-ui@1.0.0-beta.13

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.0-beta.12](https://github.com/logto-io/logto/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-10-19)

### Bug Fixes

- add tables to schemas files ([582f3d6](https://github.com/logto-io/logto/commit/582f3d615862c3d8b2c00d8e60a3617429d48e30))
- handle versioning when no `next-*.ts` found ([#2202](https://github.com/logto-io/logto/issues/2202)) ([61336df](https://github.com/logto-io/logto/commit/61336dfbc833c96ddce88be5082b82a30527ee73))
- make packages public ([e24fd04](https://github.com/logto-io/logto/commit/e24fd0479bc20c92bd38b5e214abe441404ce496))

## [1.0.0-beta.11](https://github.com/logto-io/logto/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-10-19)

### Features

- **cli:** `db alteration deploy` command ([a5280a2](https://github.com/logto-io/logto/commit/a5280a2afd3d5822e78d1f115ab6f6fdbb993261))
- **cli:** `db seed oidc` command ([911117a](https://github.com/logto-io/logto/commit/911117a785fd43ea03473f42835f2680cccca7be))
- **cli:** get/set db config key ([0eff1e3](https://github.com/logto-io/logto/commit/0eff1e3591129802f3e9b3286652ef6fc8619cf5))

### Bug Fixes

- add redirectURI validation on frontend & backend ([#1874](https://github.com/logto-io/logto/issues/1874)) ([4b0970b](https://github.com/logto-io/logto/commit/4b0970b6d8c6647a6e68bf27fe3db3aeb635768e))
- alteration script in dev ([9ebb3dd](https://github.com/logto-io/logto/commit/9ebb3ddfd963f6459ea332dbe1384058f77b453b))

## [1.0.0-beta.10](https://github.com/logto-io/logto/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-09-28)

### Features

- **core,schemas:** add phrases schema and GET /custom-phrases/:languageKey route ([#1905](https://github.com/logto-io/logto/issues/1905)) ([7242aa8](https://github.com/logto-io/logto/commit/7242aa8c2bbb70c51e9b00dd5e3aff595c3c2eff))
- **core,schemas:** migration deploy cli ([#1966](https://github.com/logto-io/logto/issues/1966)) ([7cc2f4d](https://github.com/logto-io/logto/commit/7cc2f4d14219145e562cebef41ebb3963083cc89))
- **core,schemas:** use timestamp to version migrations ([bb4bfd3](https://github.com/logto-io/logto/commit/bb4bfd3d41fdd415f68e6e13f0d4a7e8a0093933))
- **core:** add POST /session/forgot-password/{email,sms}/send-passcode ([#1963](https://github.com/logto-io/logto/issues/1963)) ([af2600d](https://github.com/logto-io/logto/commit/af2600d828bf315ce57de5813168571e7042d8de))
- **core:** add POST /session/forgot-password/{email,sms}/verify-passcode ([#1968](https://github.com/logto-io/logto/issues/1968)) ([1ea39f3](https://github.com/logto-io/logto/commit/1ea39f346367d9f300be7281a65e689bf198a65c))
- **core:** add POST /session/forgot-password/reset ([#1972](https://github.com/logto-io/logto/issues/1972)) ([acdc86c](https://github.com/logto-io/logto/commit/acdc86c8560d30a89eccb6b0f6892221ea1bc5e0))
- **core:** machine to machine apps ([cd9c697](https://github.com/logto-io/logto/commit/cd9c6978a35d9fc3a571c7bd56c972939c49a9b5))
- **schemas:** add logto configs table ([#1940](https://github.com/logto-io/logto/issues/1940)) ([577ca48](https://github.com/logto-io/logto/commit/577ca48c072ed511550e339f2d6d1ee25cedeeac))

### Bug Fixes

- bump react sdk and essentials toolkit to support CJK characters in idToken ([2f92b43](https://github.com/logto-io/logto/commit/2f92b438644bd330fa4b8cd3698d9129ecbae282))
- **core,schemas:** move alteration types into schemas src ([#2005](https://github.com/logto-io/logto/issues/2005)) ([10c1be6](https://github.com/logto-io/logto/commit/10c1be6eb76e1cb94746aee632a421aea8d4c211))

## [1.0.0-beta.9](https://github.com/logto-io/logto/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-09-07)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-beta.8](https://github.com/logto-io/logto/compare/v1.0.0-beta.6...v1.0.0-beta.8) (2022-09-01)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-beta.6](https://github.com/logto-io/logto/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-08-30)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-beta.5](https://github.com/logto-io/logto/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-08-19)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-beta.4](https://github.com/logto-io/logto/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-08-11)

### Features

- **core,schemas:** add application secret ([#1715](https://github.com/logto-io/logto/issues/1715)) ([543ee04](https://github.com/logto-io/logto/commit/543ee04f53f81b41b0669f0ac5773fc67d500c0c))
- **schemas:** guard string max length ([#1737](https://github.com/logto-io/logto/issues/1737)) ([cdf210d](https://github.com/logto-io/logto/commit/cdf210df100c4105eb095f693b7cb31a005d62b8))

## [1.0.0-beta.3](https://github.com/logto-io/logto/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-08-01)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-beta.2](https://github.com/logto-io/logto/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-07-25)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-beta.1](https://github.com/logto-io/logto/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2022-07-19)

### Features

- **core:** add response guard ([#1542](https://github.com/logto-io/logto/issues/1542)) ([6c39790](https://github.com/logto-io/logto/commit/6c397901805b01613df71eecaa06d3d84d0b606a))

## [1.0.0-beta.0](https://github.com/logto-io/logto/compare/v1.0.0-alpha.4...v1.0.0-beta.0) (2022-07-14)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-alpha.4](https://github.com/logto-io/logto/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-07-08)

### Features

- expose zod error ([#1474](https://github.com/logto-io/logto/issues/1474)) ([81b63f0](https://github.com/logto-io/logto/commit/81b63f07bb412abf1f2b42059bac2ffcfc86272c))

## [1.0.0-alpha.3](https://github.com/logto-io/logto/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2022-07-07)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-alpha.2](https://github.com/logto-io/logto/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2022-07-07)

### Bug Fixes

- **ui:** dark mode seed ([#1426](https://github.com/logto-io/logto/issues/1426)) ([be73dbf](https://github.com/logto-io/logto/commit/be73dbf4ef14cf49779775dd95848ba73904a4b2))

## [1.0.0-alpha.1](https://github.com/logto-io/logto/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2022-07-05)

**Note:** Version bump only for package @logto/schemas

## [1.0.0-alpha.0](https://github.com/logto-io/logto/compare/v0.1.2-alpha.5...v1.0.0-alpha.0) (2022-07-04)

**Note:** Version bump only for package @logto/schemas

### [0.1.2-alpha.5](https://github.com/logto-io/logto/compare/v0.1.2-alpha.4...v0.1.2-alpha.5) (2022-07-03)

**Note:** Version bump only for package @logto/schemas

### [0.1.2-alpha.4](https://github.com/logto-io/logto/compare/v0.1.2-alpha.3...v0.1.2-alpha.4) (2022-07-03)

**Note:** Version bump only for package @logto/schemas

### [0.1.2-alpha.3](https://github.com/logto-io/logto/compare/v0.1.2-alpha.2...v0.1.2-alpha.3) (2022-07-03)

**Note:** Version bump only for package @logto/schemas

### [0.1.2-alpha.2](https://github.com/logto-io/schemas/compare/v0.1.2-alpha.1...v0.1.2-alpha.2) (2022-07-02)

**Note:** Version bump only for package @logto/schemas

### [0.1.2-alpha.1](https://github.com/logto-io/schemas/compare/v0.1.2-alpha.0...v0.1.2-alpha.1) (2022-07-02)

**Note:** Version bump only for package @logto/schemas

### [0.1.2-alpha.0](https://github.com/logto-io/schemas/compare/v0.1.1-alpha.0...v0.1.2-alpha.0) (2022-07-02)

**Note:** Version bump only for package @logto/schemas

### [0.1.1-alpha.0](https://github.com/logto-io/schemas/compare/v0.1.0-internal...v0.1.1-alpha.0) (2022-07-01)

### Features

- **console,ui:** generate dark mode color in console ([#1231](https://github.com/logto-io/schemas/issues/1231)) ([f72b21d](https://github.com/logto-io/schemas/commit/f72b21d1602ab0fb35ef3e7d84f6c8ebd7e18b08))
- **console:** add application column in user management ([#728](https://github.com/logto-io/schemas/issues/728)) ([a035587](https://github.com/logto-io/schemas/commit/a0355872c65bc0da27e57e25568fbe5dcc5b671b))
- **console:** add column lastSignIn in user management ([#679](https://github.com/logto-io/schemas/issues/679)) ([a0b4b98](https://github.com/logto-io/schemas/commit/a0b4b98c35ff08c2df0863e4bc2110386fc54aee))
- **console:** audit log table ([#1000](https://github.com/logto-io/schemas/issues/1000)) ([fdd12de](https://github.com/logto-io/schemas/commit/fdd12de1cf39c36dd65dd9365ad343478718d112))
- **console:** configure cors-allowed-origins ([#695](https://github.com/logto-io/schemas/issues/695)) ([4a0577a](https://github.com/logto-io/schemas/commit/4a0577accdb36e2b916b0e520b3352f6426b64c7))
- **console:** dark logo ([#860](https://github.com/logto-io/schemas/issues/860)) ([664a218](https://github.com/logto-io/schemas/commit/664a2180a51b577fb517661cf0d7efb1374f3858))
- **console:** hide get-started page on clicking 'Hide this' button ([7fd42fd](https://github.com/logto-io/schemas/commit/7fd42fdaa17217f8be6ea120e287ea243904977a))
- **console:** integrate dark mode settings ([a04f818](https://github.com/logto-io/schemas/commit/a04f818ffb8627a5c3d594edb466d1b8e45e3015))
- **console:** log details page ([#1064](https://github.com/logto-io/schemas/issues/1064)) ([0421195](https://github.com/logto-io/schemas/commit/04211957e1222f9597c32afd2982258afa73fa31))
- **console:** sie form reorg ([#1218](https://github.com/logto-io/schemas/issues/1218)) ([2c41334](https://github.com/logto-io/schemas/commit/2c413341d1c515049faa130416f7a5e591d10e8a))
- **console:** sign in exp guide ([#755](https://github.com/logto-io/schemas/issues/755)) ([bafd094](https://github.com/logto-io/schemas/commit/bafd09474c68ca5539d676d2cbf06fa16e070edb))
- **console:** support persisting get-started progress in settings config ([43b2309](https://github.com/logto-io/schemas/commit/43b2309c994b2eb8b1b8f1c12893eb66b5ce1d95))
- **core,console:** social connector targets ([#851](https://github.com/logto-io/schemas/issues/851)) ([127664a](https://github.com/logto-io/schemas/commit/127664a62f1b1c794569b7fe9d0bfceb7b97dc74))
- **core,schemas:** koaLogSession middleware ([#767](https://github.com/logto-io/schemas/issues/767)) ([4e60446](https://github.com/logto-io/schemas/commit/4e6044641190faaa2ee4f8d4765118e381df8a30))
- **core,schemas:** log IP and user agent ([#682](https://github.com/logto-io/schemas/issues/682)) ([0ecb7e4](https://github.com/logto-io/schemas/commit/0ecb7e4d2fe869ada46cc39e0fef98d2240cb1b2))
- **core,schemas:** log token exchange success ([#809](https://github.com/logto-io/schemas/issues/809)) ([3b048a8](https://github.com/logto-io/schemas/commit/3b048a80a374ff720a5afe3b35f007b31fddd576))
- **core,schemas:** save application id that the user first consented ([#688](https://github.com/logto-io/schemas/issues/688)) ([4521c3c](https://github.com/logto-io/schemas/commit/4521c3c8d17becb6b322fc0128fff992f34d2a0d))
- **core:** add experience configs ([#745](https://github.com/logto-io/schemas/issues/745)) ([08904b8](https://github.com/logto-io/schemas/commit/08904b8f93f39cfd24dae88746e5b18ce35ff0b4))
- **core:** add role table seed ([#1145](https://github.com/logto-io/schemas/issues/1145)) ([837ad52](https://github.com/logto-io/schemas/commit/837ad523cef4a41ab9fdddfe7a92b6ed074114a0))
- **core:** add sign-in-mode ([#1132](https://github.com/logto-io/schemas/issues/1132)) ([f640dad](https://github.com/logto-io/schemas/commit/f640dad52f2e75620b392114673860138e1aca2c))
- **core:** grantRevokedListener for logging revocation of access and refresh token ([#900](https://github.com/logto-io/schemas/issues/900)) ([e5196fc](https://github.com/logto-io/schemas/commit/e5196fc31dc1c4ec8086c9df2d1cc8f5486af380))
- **core:** log error body ([#1065](https://github.com/logto-io/schemas/issues/1065)) ([2ba1121](https://github.com/logto-io/schemas/commit/2ba11215edc8bc83efcd41e1587b53fddc5bb101))
- **core:** log sending passcode with connector id ([#824](https://github.com/logto-io/schemas/issues/824)) ([82c7138](https://github.com/logto-io/schemas/commit/82c7138683f1027a227b3939d7516e0912773fe5))
- **core:** update connector db schema ([#732](https://github.com/logto-io/schemas/issues/732)) ([8e1533a](https://github.com/logto-io/schemas/commit/8e1533a70267d459feea4e5174296b17bef84d48))
- **demo-app:** implementation ([#982](https://github.com/logto-io/schemas/issues/982)) ([7f4f4f8](https://github.com/logto-io/schemas/commit/7f4f4f84addf8a25c3d30f1ac3ceeef460afcf17))
- **demo-app:** implementation (3/3) ([#1021](https://github.com/logto-io/schemas/issues/1021)) ([91e2f05](https://github.com/logto-io/schemas/commit/91e2f055f2eb75ef8846b02d0d211adbbb898b41))
- **demo-app:** show notification in main flow ([#1038](https://github.com/logto-io/schemas/issues/1038)) ([90ca76e](https://github.com/logto-io/schemas/commit/90ca76eeb5460b66d2241f137f179bf4d5d6ae37))
- remove target, platform from connector schema and add id to metadata ([#930](https://github.com/logto-io/schemas/issues/930)) ([054b0f7](https://github.com/logto-io/schemas/commit/054b0f7b6a6dfed66540042ea69b0721126fe695))
- **schemas:** create log indices on application id and user id ([#933](https://github.com/logto-io/schemas/issues/933)) ([bf6e08c](https://github.com/logto-io/schemas/commit/bf6e08c37233da372bc5570f9855df023704a93b))
- **schemas:** make users.avatar URL length 2048 ([#1141](https://github.com/logto-io/schemas/issues/1141)) ([3ac01d7](https://github.com/logto-io/schemas/commit/3ac01d72f9d30eca5836dcfbddd1700ebb3ddac1))
- update field check rules ([#854](https://github.com/logto-io/schemas/issues/854)) ([85a407c](https://github.com/logto-io/schemas/commit/85a407c5f6f76fed0513acd6fb41943413935b5a))
- use user level custom data to save preferences ([#1045](https://github.com/logto-io/schemas/issues/1045)) ([f2b44b4](https://github.com/logto-io/schemas/commit/f2b44b49f9763b365b0062000146fee2b8df72a9))

### Bug Fixes

- `lint:report` script ([#730](https://github.com/logto-io/schemas/issues/730)) ([3b17324](https://github.com/logto-io/schemas/commit/3b17324d189b2fe47985d0bee8b37b4ef1dbdd2b))
- **console:** align usage of customizeSignInExperience ([#837](https://github.com/logto-io/schemas/issues/837)) ([808a676](https://github.com/logto-io/schemas/commit/808a676da6239fa0471c65f9920bd9715bfe4c19))
- **console:** update terms of use ([#1122](https://github.com/logto-io/schemas/issues/1122)) ([9262a6f](https://github.com/logto-io/schemas/commit/9262a6f3beb7c2c46708453ce7d667dc5b39da8e))
- delete custom domain ([#737](https://github.com/logto-io/schemas/issues/737)) ([8a48fb6](https://github.com/logto-io/schemas/commit/8a48fb6225f9850aeec7917a54d849fd9a88254e))
- **schemas:** remove user foreign key on application id ([#964](https://github.com/logto-io/schemas/issues/964)) ([9d8ef76](https://github.com/logto-io/schemas/commit/9d8ef7632b2d1d2094eae1b232eba334342e5d74))
