import Taskbar from '../taskbar/Taskbar'
import DesktopBackground from './DesktopBackground'
import DesktopWorkspace from './DesktopWorkspace'

const Desktop = () => {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
        <DesktopBackground />
        <DesktopWorkspace />
        <Taskbar />
    </div>
  )
}

export default Desktop