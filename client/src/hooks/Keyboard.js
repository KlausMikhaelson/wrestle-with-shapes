import React, { useCallback, useEffect, useState } from 'react'

function actionByKey(key) {
	const keyActionMap = {
		KeyW: 'stepForward',
		KeyS: 'stepBackward',
		KeyA: 'stepLeft',
		KeyD: 'stepRight',
		Space: 'jump',
        ArrowUp: 'stepForward_2',
        ArrowDown: 'stepBackward_2',
        ArrowLeft: 'stepLeft_2',
        ArrowRight: 'stepRight_2'
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
        stepForward_2: false,
        stepBackward_2: false,
        stepRight_2: false,
        stepLeft_2: false 
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
        // console.log(e)
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