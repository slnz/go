import { rest, RestHandler } from 'msw'

import { GetContactTimeline } from './getContactTimeline'

export function getContactTimelineHandler(): RestHandler {
  return rest.get(
    'https://api.fluro.io/contact/:_id/timeline',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            created: '2022-03-22T00:22:24.808Z',
            date: '2022-03-22T00:22:24.808Z',
            key: 'content.edit',
            message: "Updated Robert Smith 'Lead' progress",
            _id: '623916c01c737e0270453df2'
          },
          {
            _id: '622da180e6f8bb09b4876e54',
            data: {
              body: 'Still trying to find a time'
            },
            title: 'Comment',
            author: {
              _id: '5f10e89f0b15ca3a1e5d8430',
              name: 'Brian Chen'
            },
            _type: 'post',
            definition: 'comment',
            created: '2022-03-13T07:47:12.820Z',
            fullDefinition: {
              title: 'Comment',
              fields: [
                {
                  type: 'string',
                  title: 'Comment',
                  key: 'body'
                }
              ]
            },
            date: '2022-03-13T07:47:12.820Z'
          },
          {
            _id: '6227c8e3d9037b0017fa9530',
            data: {
              whatDoYouStudy: ['Computer Science'],
              whichUniversityCampusDoYouStudyAt: ['Victoria Uni: Kelburn'],
              whatYearAreYou: ['Postgraduate'],
              idLikeToLookAtYourFreeMagazineThatHelpsWith: [
                'Maintaining Good Mental Heath at Uni'
              ],
              howImportantIsSpiritualityToYou: [
                "I'm committed to a particular faith / religion"
              ],
              whichOfTheFollowingBestDescribesYou: ['Christian'],
              howInterestedWouldYouBeInHavingAChatWithSomeoneAboutWhoJesusIs: [
                'Maybe / Possibly'
              ],
              sex: ['Male'],
              formTitle: 'OTJ 2022',
              whatDoYouGetUpToInYourFreeTime:
                'Go out driving, sleeping, movies',
              firstName: 'Robert',
              lastName: 'Smith',
              phoneNumber: '021987654',
              method: 'qrcode',
              submissionId: '6226c355fd986714c65f9b8a'
            },
            _type: 'post',
            author: {
              _id: '5f10e89f0b15ca3a1e5d8430',
              name: 'Brian Chen'
            },
            definition: 'paperform_6205952767b7ed2f07541b52',
            created: '2022-03-08T21:21:39.804Z',
            fullDefinition: {
              title: 'OTJ 2022',
              fields: [
                {
                  title: 'Form Title',
                  key: 'formTitle',
                  type: 'string'
                },
                {
                  title: 'What do you get up to in your free time?',
                  key: 'whatDoYouGetUpToInYourFreeTime',
                  type: 'string'
                },
                {
                  title: 'What do you study?',
                  key: 'whatDoYouStudy',
                  type: 'string'
                },
                {
                  title: 'Which university campus do you study at?',
                  key: 'whichUniversityCampusDoYouStudyAt',
                  type: 'string'
                },
                {
                  title: 'You\'ve selected "Other". Where do you study?',
                  key: 'youveSelectedOtherWhereDoYouStudy',
                  type: 'string'
                },
                {
                  title: 'Halls of Residence:',
                  key: 'hallsOfResidence',
                  type: 'string'
                },
                {
                  title: 'What year are you?',
                  key: 'whatYearAreYou',
                  type: 'string'
                },
                {
                  title:
                    "We're giving away free welcome packs to students at {{ campus }} with freebies and helpful info about your campus. Would you be keen for one?",
                  key: 'wereGivingAwayFreeWelcomePacksToStudentsAtCampusWithFreebiesAndHelpfulInfoAboutYourCampusWouldYouBeKeenForOne',
                  type: 'string'
                },
                {
                  title:
                    "I'd like to look at your free magazine that helps with...",
                  key: 'idLikeToLookAtYourFreeMagazineThatHelpsWith',
                  type: 'string'
                },
                {
                  title: 'How important is spirituality to you?',
                  key: 'howImportantIsSpiritualityToYou',
                  type: 'string'
                },
                {
                  title: 'Which of the following best describes you?',
                  key: 'whichOfTheFollowingBestDescribesYou',
                  type: 'string'
                },
                {
                  title:
                    'Hypothetically, if you were to die tonight, how confident are you that you would go to be with God?',
                  key: 'hypotheticallyIfYouWereToDieTonightHowConfidentAreYouThatYouWouldGoToBeWithGod',
                  type: 'string'
                },
                {
                  title:
                    "We're looking for people who have a desire to follow Jesus and who would like to reach students on your campus for Him... does that sound like you?",
                  key: 'wereLookingForPeopleWhoHaveADesireToFollowJesusAndWhoWouldLikeToReachStudentsOnYourCampusForHimDoesThatSoundLikeYou',
                  type: 'string'
                },
                {
                  title:
                    'How interested would you be in having a chat with someone about who Jesus is?',
                  key: 'howInterestedWouldYouBeInHavingAChatWithSomeoneAboutWhoJesusIs',
                  type: 'string'
                },
                {
                  title: 'First name:',
                  key: 'firstName',
                  type: 'string'
                },
                {
                  title: 'Last Name',
                  key: 'lastName',
                  type: 'string'
                },
                {
                  title: 'Sex',
                  key: 'sex',
                  type: 'string'
                },
                {
                  title: 'Other Description',
                  key: 'youveSelectedOtherDescriptionPleaseSpecifyYourAnswer',
                  type: 'string'
                },
                {
                  title: 'Phone Number',
                  key: 'phoneNumber',
                  type: 'string'
                },
                {
                  title: 'Where are you currently living?',
                  type: 'string',
                  directive: 'input'
                },
                {
                  title: 'Referral',
                  key: 'referral',
                  type: 'string'
                },
                {
                  title: 'Method',
                  key: 'method',
                  type: 'string'
                },
                {
                  title: 'Submission Id',
                  key: 'submissionId',
                  type: 'string'
                }
              ]
            },
            date: '2022-03-08T21:21:39.804Z'
          },
          {
            _id: '6032ea8de4fbe7135394c232',
            key: 'content.edit',
            message: "Tagged 'Robert Smith'",
            created: '2021-02-21T23:19:41.028Z',
            date: '2021-02-21T23:19:41.028Z'
          },
          {
            _id: '6032ea74973ff879acfb70ea',
            definition: 'typeform_Wzq6N1nH',
            data: {
              myFavouritePlaceInTheWorldIs: 'Queenstown',
              whichUniversityCampusDoYouStudyAt:
                'Victoria University of Wellington: Kelburn',
              idLikeToLookAtYourFreeMagazineThatHelpsWith:
                'Studying successfully',
              whichStatementBestDescribesWhereYouAreOnYourSpiritualJourney:
                "I'm committed to a particular faith / religion",
              whichOfTheFollowingBestDescribesYou: 'Christian',
              howInterestedWouldYouBeInHavingAChatWithSomeoneAboutWhoJesusIs:
                'Maybe / Possibly',
              firstName: 'Robert',
              lastName: 'Smith',
              gender: 'Male',
              mobilePhoneNumber: '+6421987654',
              whatDoYouStudy: 'Computer Science',
              whatYearAreYou: 'Postgraduate',
              typeformId: 'aBCdEFg'
            },
            _type: 'post',
            created: '2021-02-21T23:19:16.157Z',
            fullDefinition: {
              title: 'On The Journey Survey 2021',
              fields: [
                {
                  title: 'My favourite place in the world is...',
                  key: 'myFavouritePlaceInTheWorldIs',
                  type: 'string'
                },
                {
                  title: 'Where do you study?',
                  key: 'whichUniversityCampusDoYouStudyAt',
                  type: 'string'
                },
                {
                  title: 'You\'ve selected "Other". Where do you study?',
                  key: 'youveSelectedOtherWhereDoYouStudy',
                  type: 'string'
                },
                {
                  title:
                    "I'd like to look at your free magazine that helps with...",
                  key: 'idLikeToLookAtYourFreeMagazineThatHelpsWith',
                  type: 'string'
                },
                {
                  title:
                    'Which statement best describes where you are on your spiritual journey...',
                  key: 'whichStatementBestDescribesWhereYouAreOnYourSpiritualJourney',
                  type: 'string'
                },
                {
                  title: 'Which of the following best describes you?',
                  key: 'whichOfTheFollowingBestDescribesYou',
                  type: 'string'
                },
                {
                  title:
                    'How interested would you be to look more into reasons to believe in God? ',
                  key: 'howInterestedWouldYouBeToLookMoreIntoReasonsToBelieveInGod',
                  type: 'string'
                },
                {
                  title:
                    'How interested would you be in having a chat with someone about who Jesus is? ',
                  key: 'howInterestedWouldYouBeInHavingAChatWithSomeoneAboutWhoJesusIs',
                  type: 'string'
                },
                {
                  title:
                    'Hypothetically, if you were to die tonight, how confident are you that you would go to be with God?',
                  key: 'hypotheticallyIfYouWereToDieTonightHowConfidentAreYouThatYouWouldGoToBeWithGod',
                  type: 'string'
                },
                {
                  title:
                    "We're looking for people who have a desire to follow Jesus and who would like to reach students at  for Him... does that sound like you?",
                  key: 'wereLookingForPeopleWhoHaveADesireToFollowJesusAndWhoWouldLikeToReachStudentsAtFieldA726Cee5Cd6B486F9Cb95F7C72Ac2B13ForHimDoesThatSoundLikeYou',
                  type: 'string'
                },
                {
                  title: 'First name:',
                  key: 'firstName',
                  type: 'string'
                },
                {
                  title: 'Last name:',
                  key: 'lastName',
                  type: 'string'
                },
                {
                  title: 'Gender:',
                  key: 'gender',
                  type: 'string'
                },
                {
                  title: 'Mobile phone number:',
                  key: 'mobilePhoneNumber',
                  type: 'string'
                },
                {
                  title: 'What do you study? ',
                  key: 'whatDoYouStudy',
                  type: 'string'
                },
                {
                  title: 'What year are you?',
                  key: 'whatYearAreYou',
                  type: 'string'
                },
                {
                  title: 'offer',
                  key: 'offer',
                  type: 'string'
                },
                {
                  title: 'ref',
                  key: 'ref',
                  type: 'string'
                }
              ]
            },
            date: '2021-02-21T23:19:16.157Z'
          },
          {
            _id: '6032ea74973ff879acfb70e3',
            key: 'content.create',
            message: 'Created contact',
            created: '2021-02-21T23:19:16.002Z',
            date: '2021-02-21T23:19:16.002Z'
          }
        ] as GetContactTimeline[])
      )
    }
  )
}

export function getContactTimelineHandlerLoading(): RestHandler {
  return rest.get(
    'https://api.fluro.io/contact/:_id/timeline',
    (_req, res, ctx) => {
      return res(ctx.delay(1000 * 60 * 60 * 60))
    }
  )
}
