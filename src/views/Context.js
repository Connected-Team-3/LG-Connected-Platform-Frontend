import {createContext, useState} from 'react';

export const PanelContext = createContext();

export const Provider = props => {
	const [panelData, setPanelData] = useState([
		{name: 'launch', data: {}}
	]);
	return (
		<PanelContext.Provider
			value={{
				panelData,
				setPanelData
			}}
		>
			{props.children}
		</PanelContext.Provider>
	);
};
