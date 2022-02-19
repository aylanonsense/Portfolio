import { useState, useEffect } from "react"

export default function useKeyDown(keyCode: string) {
  const [ isKeyDown, setIsKeyDown ] = useState<boolean>(false)
  const onKeyUp = (evt: KeyboardEvent) => {
    if (evt.key == keyCode) {
      setIsKeyDown(false)
    }
  }
  const onKeyDown = (evt: KeyboardEvent) => {
    console.log(evt.key)
    if (evt.key == keyCode) {
      setIsKeyDown(true)
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])
  return isKeyDown
}
