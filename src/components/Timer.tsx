import { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TimerCircleProps {
  duration: number
  className?: string
  isPlaying?: boolean
  onUpdate?: (val: number) => void
  initialRemainingTime?: number
  updateInterval?: number
  onComplete?: () => void
}

const TimerCircle = ({ duration, className, isPlaying, onUpdate, initialRemainingTime, updateInterval, onComplete }: TimerCircleProps) => {
  return (
    <div className={className}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duration, duration / 2, duration / 4, 0]}
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