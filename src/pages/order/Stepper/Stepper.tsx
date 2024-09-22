import { Steps } from "antd";
import moment from "moment"; // Optional for formatting

interface StepperProps {
  deliverySteps: any; 
}

const Stepper = ({ deliverySteps }: StepperProps) => {
  return (
    <div>
      <Steps
        direction="vertical"
        items={deliverySteps.map((step: any) => ({
          title: step.step,
          description: (
            <>
              <p style={{ margin: 0 }}>{ step.description ?? 'Tiada Status' }</p>
              {/* {step.timestamp && (
                <p style={{ color: 'gray' }}>
                  {moment(step.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </p>
              )} */}
            </>
          ),
          status: step.status
        }))}
      />
    </div>
  );
};

export default Stepper;
