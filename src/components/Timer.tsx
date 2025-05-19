import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { TimerCircleProps } from '../types'

const TimerCircle = ({ 
  duration, 
  className, 
  isPlaying, 
  onUpdate, 
  initialRemainingTime, 
  updateInterval, 
  onComplete 
}: TimerCircleProps) => {
  return (
    <div className={className}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#ec4899', '#db2777', '#be185d', '#9d174d']}
        colorsTime={[duration, duration / 2, duration / 3, 0]}
        size={100}
        strokeWidth={6}
        onUpdate={onUpdate}
        initialRemainingTime={initialRemainingTime}
        updateInterval={updateInterval}
        onComplete={onComplete}
      >
        {({ remainingTime }) => <h2 className='text-4xl font-semibold'>{remainingTime}</h2>}
      </CountdownCircleTimer>
    </div>
  )
}

export default TimerCircle