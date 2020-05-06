import React from 'react'
import ThemeComponent from 'components/Theme'
import ThemeServiceComponent from 'components/Theme/index.service'
import ThemeModalComponent from 'components/ThemeModal'
import FeedScreen from 'screens/FeedScreen'

class ThemeScreen extends React.Component {
  render() {
    return (
      <ThemeServiceComponent>
        {(props) => (
          <React.Fragment>
            {props.themePreview.status === 'success' ?
              <ThemeModalComponent
                isVisible={props.themePreview.status === 'success'}
                onApplyClick={() => {
                  props.usersEditProfileRequest()
                  props.themePreviewIdle()
                }}
                onDiscardClick={() => props.themePreviewIdle()}
              >
                <FeedScreen />
              </ThemeModalComponent>
            : null}

            <ThemeComponent
              {...props}
            />
          </React.Fragment>
        )}
      </ThemeServiceComponent>
    )
  }
}

export default ThemeScreen