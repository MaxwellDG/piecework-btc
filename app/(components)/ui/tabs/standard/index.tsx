export type TabProp = {
    text: string;
    onClick: () => void;
};

export type Props = {
    tabs: TabProp[];
    currentTabIndex: number;
};

export default function StandardTab({ tabs, currentTabIndex }: Props) {
    return (
        <div className="flex flex-row mb-2 gap-x-1">
            {tabs.map((tab: TabProp, i: number) => (
                <button key={i} onClick={tab.onClick} className={`px-2 py-1 flex border-t border-r border-l ${currentTabIndex === i ? 'border-teal' : 'border-lightGray'}`}>
                    <p
                        style={
                            currentTabIndex === i
                                ? {
                                      textShadow:
                                          '0px 0px 10px rgba(61, 211, 165, 1), 0px 0px 2px #fff',
                                  }
                                : {}
                        }
                        className={`${
                            currentTabIndex === i
                                ? 'text-teal font-semibold'
                                : 'text-whiteGray'
                        }`}
                    >
                        {tab.text}
                    </p>
                </button>
            ))}
        </div>
    );
}
