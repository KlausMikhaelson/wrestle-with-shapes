import React, { useCallback, useEffect, useState } from 'react'

function actionByKey(key) {
	const keyActionMap = {
		KeyW: 'stepForward',
		KeyS: 'stepBackward',
		KeyA: 'stepLeft',
		KeyD: 'stepRight',
		Space: 'jump',
		Digit1: 'dirt',
		Digit2: 'grass',
		Digit3: 'glass',
		Digit4: 'wood',
		Digit5: 'log',
	}
	return keyActionMap[key]
}

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        stepForward: false,
        stepBackward: false,
        stepLeft: false,
        stepRight: false,
        jump: false,
        texture1: false,
        texture2: false,
        texture3: false,
        texture4: false,
        texture5: false,
    });

    const handleKeydown = useCallback((e) => {
		const action = actionByKey(e.code)
		if (action) {
			setActions((prev) => {
				return ({
					...prev,
					[action]: true
				})
			})
		}
	}, [])


    const handleKeyup = useCallback((e) => {
        console.log(e)
        const action = actionByKey(e.code)
        if(action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup)
        return() => {
            document.removeEventListener('keyup', handleKeyup)
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [handleKeydown, handleKeyup])

  return actions;
}