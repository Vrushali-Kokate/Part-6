import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) return null

  const style = {
    border: '2px solid black',
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{notification}</div>
}

export default Notification
