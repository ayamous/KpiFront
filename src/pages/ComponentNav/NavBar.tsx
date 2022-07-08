import {
	Accessibility,
	AddAlarm,
	Chat,
	FlightTakeoff,
	AccessTimeRounded,
	OutdoorGrill,
} from '@material-ui/icons';

export function NavBar({className}: {className: string}) {
	return (
		<div className={`${className} hidden 2xl:flex flex-col`}>
			<div className="w-52 my-5 self-center">
				<img src="/ram2.png" alt="ram" className="" />
			</div>
			<div className="h-full my-6">
				<ul className="flex flex-col w-72 gap-y-3 h-full">
					<li className="w-full text-white font-bold bg-ram-red rounded-tr-full rounded-br-full p-3 mb-5 flex justify-center items-center cursor-pointer gap-4">
						<FlightTakeoff />
						lorem
					</li>
					<li className="w-full text-white font-bold bg-ram-red rounded-tr-full rounded-br-full p-3 mb-5 flex justify-center items-center cursor-pointer gap-4">
						<Chat />
						lorem
					</li>
					<li className="w-full text-white font-bold bg-ram-red rounded-tr-full rounded-br-full p-3 mb-5 flex justify-center items-center cursor-pointer gap-4">
						<Accessibility />
						lorem
					</li>
					<li className="w-full text-white font-bold bg-ram-red rounded-tr-full rounded-br-full p-3 mb-5 flex justify-center items-center cursor-pointer gap-4">
						<AddAlarm />
						lorem
					</li>
					<li className="w-full text-white font-bold bg-ram-red rounded-tr-full rounded-br-full p-3 mb-5 flex justify-center items-center cursor-pointer gap-4">
						<AccessTimeRounded />
						lorem
					</li>
					<li
						className="w-full text-white font-bold bg-ram-red rounded-tr-full rounded-br-full p-3 mb-5 flex justify-center items-center cursor-pointer gap-4 mt-auto">
						<OutdoorGrill />
						logout
					</li>
				</ul>
			</div>
		</div>
	);
}
