import React from 'react';
import Proptypes from 'prop-types';
import MaterialStepper from '@mui/material/Stepper';
import MaterialStep from '@mui/material/Step';
import MaterialStepLabel from '@mui/material/StepLabel';
import './Stepper.scss';

const Button = React.lazy(() => import('components/elements/Button'));

const Stepper = ({
  steps,
  skipStep,
  activeStep,
  children,
  handleBack,
  handleNext,
}) => {
  return (
    <div className="material-stepper">
      <div className="material-stepper_header">
        <MaterialStepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <MaterialStep key={index}>
              <MaterialStepLabel>{step}</MaterialStepLabel>
            </MaterialStep>
          ))}
        </MaterialStepper>
      </div>
      <div className="material-stepper_body">{children}</div>
      <div className="material-stepper_footer">
        <div>
          <Button
            variant="text"
            disabled={activeStep === 0}
            onClick={handleBack}
            content="BACK"
          />
        </div>
        <div>
          {skipStep === activeStep && (
            <Button variant="text" content="SKIP" onClick={handleNext} />
          )}
          <Button
            variant="text"
            content={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

Stepper.defaultProps = {
  skipStep: NaN,
  children: '',
  handleBack: () => {},
  handleNext: () => {},
};

Stepper.propTypes = {
  steps: Proptypes.arrayOf(Proptypes.string).isRequired,
  skipStep: Proptypes.number,
  activeStep: Proptypes.number.isRequired,
  children: Proptypes.node,
  handleBack: Proptypes.func,
  handleNext: Proptypes.func,
};

export default Stepper;
