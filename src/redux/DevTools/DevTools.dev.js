import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(<DockMonitor
  toggleVisibilityKey="h"
  changePositionKey="q"
  defaultIsVisible={false}
  defaultSize={0.2}
>
  <LogMonitor />
</DockMonitor>);

export default DevTools;
