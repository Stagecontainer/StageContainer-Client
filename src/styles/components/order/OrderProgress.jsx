import styled from "styled-components";
import * as Progress from "@radix-ui/react-progress";
import { useEffect, useState } from "react";

const OrderProgress = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(33), 300);
    return () => clearTimeout(timer);
  }, [progressValue]);

  return (
    <Container>
      <div className="progress-container">
        <div className="progress">
          <h2>현재 전체 진행률</h2>
          <strong className="progress-rate">{progressValue}%</strong>
        </div>
      </div>

      <div className="progress-bar"></div>
      <ProgressBar>
        <Progress.Root className="progress-root" value={progressValue}>
          <Progress.Indicator
            className="progress-indicator"
            style={{ transform: `translateX(-${100 - progressValue}%)` }}
          />
        </Progress.Root>
      </ProgressBar>
    </Container>
  );
};

export default OrderProgress;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1194px;
  height: 72px;
  margin: 0 0 74px 18px;

  .progress-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .progress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;
      height: 27px;

      h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        color: black;
      }

      .progress-rate {
        font-size: 18px;
        font-weight: 700;
        color: #ff7a00;
      }
    }
  }
`;

const ProgressBar = styled.div`
  .progress-root {
    /* width: 907px; */
    width: 1194px;
    height: 18px;
    border-radius: 76px;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .progress-indicator {
    background-color: #ff7a00;
    width: 100%;
    height: 100%;
    border-radius: 76px;
    transition: transform 900ms ease-in-out;
  }
`;
