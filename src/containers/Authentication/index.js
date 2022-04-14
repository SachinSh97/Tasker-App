import React, { useState, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { CONTEXT, projectSetupSteps } from 'config';
import { containers } from 'routes';
import { registerUserAction } from 'actions/authentication';
import { getRandomColor } from 'utils/helper';
import './Authentication.scss';

//components
const Loader = React.lazy(() => import('components/elements/Loader'));
const Stepper = React.lazy(() => import('components/Stepper'));
const Card = React.lazy(() => import('components/elements/Card'));
//container
const RegistrationForm = React.lazy(() =>
  import('containers/components/RegistrationForm'),
);
const AddMemberForm = React.lazy(() =>
  import('containers/components/AddMemberForm'),
);
const SetUpProject = React.lazy(() =>
  import('containers/components/SetUpProjectForm'),
);

const initialUserState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const Authentication = ({ user, actions, history }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState({ ...initialUserState });
  const [members, setMembers] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [isInvalidState, setIsInvalid] = useState({});

  useEffect(() => {
    if (Object.keys(user)?.length > 0) {
      history?.push(`${CONTEXT}/${containers.project}`);
    }
  }, [user]);

  const validateCurrentStepFields = (activeStep) => {
    let isValid = true;
    let draftIsInvalidState = { ...isInvalidState };
    switch (activeStep) {
      case 0:
        let properties = Object?.keys(userDetails) ?? [];
        properties?.forEach((property) => {
          if (!userDetails[property]) {
            draftIsInvalidState[property] = 'Please enter a valid input';
            isValid = false;
          }
        });
        break;
      case 2:
        if (!projectDetails.hasOwnProperty('project')) {
          draftIsInvalidState['project'] = 'Please enter a project name';
          isValid = false;
        }
        break;
      default:
        break;
    }
    setIsInvalid(draftIsInvalidState);
    return isValid;
  };

  const handleNext = () => {
    if (
      activeStep !== projectSetupSteps.length - 1 &&
      Object.values(isInvalidState)?.length == 0 &&
      validateCurrentStepFields(activeStep)
    ) {
      setActiveStep(activeStep + 1);
    } else {
      if (validateCurrentStepFields(activeStep)) {
        const requestBody = {
          user: {
            id: uuidv4(),
            firstName: userDetails?.firstName,
            lastName: userDetails?.lastName,
            username: userDetails?.username,
            password: userDetails?.password,
            color: getRandomColor(),
          },
          project: { ...projectDetails, id: uuidv4() },
          members,
        };
        actions?.registerUser(requestBody);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Update the component state to reflect input invalidity
  const toggleInputInvalidationState = ({
    inputName,
    errorMessage,
    isInvalid,
  }) => {
    const draftIsInvalidState = { ...isInvalidState };

    isInvalid
      ? setIsInvalid({ ...draftIsInvalidState, [inputName]: errorMessage })
      : draftIsInvalidState.hasOwnProperty(inputName) &&
        delete draftIsInvalidState[inputName] &&
        setIsInvalid(draftIsInvalidState);
  };

  const renderForm = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <RegistrationForm
            userDetails={userDetails}
            isInvalidState={isInvalidState}
            setUserDetails={setUserDetails}
            toggleInputInvalidationState={toggleInputInvalidationState}
          />
        );
      case 1:
        return <AddMemberForm members={members} setMembers={setMembers} />;
      case 2:
        return (
          <SetUpProject
            projectDetails={projectDetails}
            isInvalidState={isInvalidState}
            setProjectDetails={setProjectDetails}
            toggleInputInvalidationState={toggleInputInvalidationState}
          />
        );
      default:
        return '';
    }
  };

  return (
    <div className="authentication">
      <Stepper
        steps={projectSetupSteps}
        skipStep={1}
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
      >
        <Suspense fallback={<Loader />}>
          <Card classname="authentication_card">{renderForm(activeStep)}</Card>
        </Suspense>
      </Stepper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state?.authentication?.user ?? {},
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ registerUser: registerUserAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
