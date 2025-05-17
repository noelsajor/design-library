import React, { useState } from 'react';
import NavBar from './NavBar';
import Card, { LayoutGrid } from './Card';
import Button from './Button';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { ButtonGroup } from './index';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconDownload, IconSettings as IconSettings2 } from '@tabler/icons-react';

const dashboardCards = [
	{
		title: 'Requests',
		value: '128',
		description: 'Total open requests',
		color: COLORS.navyBlue,
		button: 'View All',
		onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/requests'),
	},
	{
		title: 'In Progress',
		value: '42',
		description: 'Requests being processed',
		color: COLORS.teal,
		button: 'Track',
		onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/track-in-progress'),
	},
	{
		title: 'Completed',
		value: '86',
		description: 'Requests completed this month',
		color: COLORS.elBosqueGreen,
		button: 'Report',
		onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/report-complete'),
	},
	{
		title: 'Warnings',
		value: '3',
		description: 'Critical issues to review',
		color: COLORS.sangriaRed,
		button: 'Resolve',
		onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/resolve-warnings'),
	},
];

// More realistic and varied fake request data
const fakeRequests = [
	{
		id: 1001,
		title: 'Purchase Laptops for IT',
		status: 'Open',
		owner: 'John Doe',
		created: '2025-05-01',
		priority: 'High',
		department: 'IT',
		description: 'Requesting 10 new laptops for onboarding.',
	},
	{
		id: 1002,
		title: 'Office Supplies Restock',
		status: 'Completed',
		owner: 'Jane Smith',
		created: '2025-04-28',
		priority: 'Medium',
		department: 'Admin',
		description: 'Restock paper, pens, and printer ink.',
	},
	{
		id: 1003,
		title: 'Network Upgrade',
		status: 'In Progress',
		owner: 'Alice Lee',
		created: '2025-05-10',
		priority: 'High',
		department: 'IT',
		description: 'Upgrade office WiFi and switches.',
	},
	{
		id: 1004,
		title: 'Cafeteria Menu Update',
		status: 'Warning',
		owner: 'Bob Brown',
		created: '2025-05-12',
		priority: 'Low',
		department: 'Facilities',
		description: 'Menu not updated for May.',
	},
	{
		id: 1005,
		title: 'Security Badge Issue',
		status: 'Open',
		owner: 'Jane Smith',
		created: '2025-05-13',
		priority: 'Medium',
		department: 'Security',
		description: 'Badge reader not working at main entrance.',
	},
	{
		id: 1006,
		title: 'Software License Renewal',
		status: 'Completed',
		owner: 'Alice Lee',
		created: '2025-04-30',
		priority: 'High',
		department: 'IT',
		description: 'Renew Adobe and Microsoft licenses.',
	},
	{
		id: 1007,
		title: 'HVAC Maintenance',
		status: 'In Progress',
		owner: 'Bob Brown',
		created: '2025-05-09',
		priority: 'Medium',
		department: 'Facilities',
		description: 'Quarterly HVAC system check.',
	},
	{
		id: 1008,
		title: 'Conference Room Setup',
		status: 'Open',
		owner: 'John Doe',
		created: '2025-05-14',
		priority: 'Low',
		department: 'Admin',
		description: 'Set up A/V for board meeting.',
	},
	{
		id: 1009,
		title: 'Printer Repair',
		status: 'Warning',
		owner: 'Jane Smith',
		created: '2025-05-11',
		priority: 'High',
		department: 'IT',
		description: 'Main office printer jammed.',
	},
	{
		id: 1010,
		title: 'Parking Lot Lighting',
		status: 'Completed',
		owner: 'Bob Brown',
		created: '2025-05-02',
		priority: 'Medium',
		department: 'Facilities',
		description: 'Replace bulbs in parking lot.',
	},
	// Add more fake requests for a realistic table
	...Array.from({ length: 30 }, (_, i) => ({
		id: 1011 + i,
		title: `Auto-generated Request #${1011 + i}`,
		status: ['Open', 'In Progress', 'Completed', 'Warning'][i % 4],
		owner: ['John Doe', 'Jane Smith', 'Alice Lee', 'Bob Brown'][i % 4],
		created: `2025-05-${(i % 28 + 1).toString().padStart(2, '0')}`,
		priority: ['Low', 'Medium', 'High'][i % 3],
		department: ['IT', 'Admin', 'Facilities', 'Security'][i % 4],
		description: 'Auto-generated request for demo purposes.',
	})),
];

const statusOptions = ['All', 'Open', 'In Progress', 'Completed', 'Warning'];
const ownerOptions = ['All', 'John Doe', 'Jane Smith', 'Alice Lee', 'Bob Brown'];
const priorityOptions = ['All', 'Low', 'Medium', 'High'];
const departmentOptions = ['All', 'IT', 'Admin', 'Facilities', 'Security'];

const DashboardPage: React.FC<{ showOnlyTable?: boolean }> = ({ showOnlyTable }) => {
	// Pagination and filter state
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState('All');
	const [owner, setOwner] = useState('All');
	const [priority, setPriority] = useState('All');
	const [department, setDepartment] = useState('All');
	const [pageSize, setPageSize] = useState(10);
	const navigate = useNavigate();

	// Filtering logic
	const filtered = fakeRequests.filter(
		r =>
			(status === 'All' || r.status === status) &&
			(owner === 'All' || r.owner === owner) &&
			(priority === 'All' || r.priority === priority) &&
			(department === 'All' || r.department === department),
	);
	const totalPages = Math.ceil(filtered.length / pageSize);
	const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

	if (showOnlyTable) {
		// Only render the table and filters for the /requests page
		return (
			<>

				<main
					style={{
						width: '100%',
						minHeight: 1024,
						margin: '0 auto',
						boxSizing: 'border-box',
						flex: 1,
						background: COLORS.almostWhite,
					}}
				>
					{/* Optionally add Breadcrumb here if needed */}
					<section style={{ marginTop: SPACING.xxl }}>
						<h2
							style={{
								...TYPOGRAPHY.titleSmallSM,
								color: COLORS.navyBlue,
								marginBottom: SPACING.md,
							}}
						>
						</h2>
						{/* Filters */}
						<div
							style={{
								display: 'flex',
								gap: 24,
								marginBottom: 24,
								flexWrap: 'wrap',
							}}
						>
							<label
								style={{
									...TYPOGRAPHY.bodyRegular,
									color: COLORS.gunmetal,
								}}
							>
								Status:
								<select
									value={status}
									onChange={e => {
										setStatus(e.target.value);
										setPage(1);
									}}
									style={{
										marginLeft: 8,
										padding: 4,
										color: COLORS.navyBlue,
										background: COLORS.almostWhite,
										border: `1px solid ${COLORS.lightSilver}`,
										borderRadius: 4,
									}}
								>
									{statusOptions.map(opt => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</label>
							<label
								style={{
									...TYPOGRAPHY.bodyRegular,
									color: COLORS.gunmetal,
								}}
							>
								Owner:
								<select
									value={owner}
									onChange={e => {
										setOwner(e.target.value);
										setPage(1);
									}}
									style={{
										marginLeft: 8,
										padding: 4,
										color: COLORS.navyBlue,
										background: COLORS.almostWhite,
										border: `1px solid ${COLORS.lightSilver}`,
										borderRadius: 4,
									}}
								>
									{ownerOptions.map(opt => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</label>
							<label
								style={{
									...TYPOGRAPHY.bodyRegular,
									color: COLORS.gunmetal,
								}}
							>
								Priority:
								<select
									value={priority}
									onChange={e => {
										setPriority(e.target.value);
										setPage(1);
									}}
									style={{
										marginLeft: 8,
										padding: 4,
										color: COLORS.navyBlue,
										background: COLORS.almostWhite,
										border: `1px solid ${COLORS.lightSilver}`,
										borderRadius: 4,
									}}
								>
									{priorityOptions.map(opt => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</label>
							<label
								style={{
									...TYPOGRAPHY.bodyRegular,
									color: COLORS.gunmetal,
								}}
							>
								Department:
								<select
									value={department}
									onChange={e => {
										setDepartment(e.target.value);
										setPage(1);
									}}
									style={{
										marginLeft: 8,
										padding: 4,
										color: COLORS.navyBlue,
										background: COLORS.almostWhite,
										border: `1px solid ${COLORS.lightSilver}`,
										borderRadius: 4,
									}}
								>
									{departmentOptions.map(opt => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</label>
						</div>
						{/* Table */}
						<div
							style={{
								width: '100%',
								maxWidth: 1440,
								minWidth: 0,
								overflowX: 'auto',
								background: COLORS.white,
								borderRadius: 0,
								padding: 0,
								border: `1.5px solid ${COLORS.lightSilver}`,
								boxSizing: 'border-box',
							}}
						>
							<table style={{ width: '100%', minWidth: 800, borderCollapse: 'separate', borderSpacing: 0, fontFamily: 'inherit', tableLayout: 'auto' }}>
								<thead>
									<tr style={{ background: COLORS.almostWhite }}>
										{['ID', 'Title', 'Status', 'Owner', 'Department', 'Created', 'Priority', 'Action'].map((col) => (
											<th
												key={col}
												style={{
													...TYPOGRAPHY.bodySmallSM,
													color: COLORS.navyBlue,
													padding: '16px 12px',
													textAlign:
														col === 'ID' ? 'right' :
														'left',
													fontWeight: 600,
													background: COLORS.almostWhite,
													borderBottom: `2px solid ${COLORS.lightSilver}`,
													position: 'sticky',
													top: 0,
													zIndex: 1,
												}}
											>
												{col}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{paged.map((req, rowIdx) => (
										<tr
											key={req.id}
											style={{
												background: rowIdx % 2 === 0 ? COLORS.white : COLORS.almostWhite,
												borderBottom: `1px solid ${COLORS.lightSilver}`,
												transition: 'background 0.2s',
												cursor: 'pointer',
											}}
											onMouseOver={e => (e.currentTarget.style.background = COLORS.lightSilver)}
											onMouseOut={e => (e.currentTarget.style.background = rowIdx % 2 === 0 ? COLORS.white : COLORS.almostWhite)}
										>
											<td style={{ padding: '12px 12px', fontWeight: 500, color: COLORS.gunmetal, textAlign: 'right' }}>{req.id}</td>
											<td style={{ padding: '12px 12px', color: COLORS.blue, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer', whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left' }}>{req.title}</td>
											<td style={{ padding: '12px 12px', color: COLORS.gunmetal, textAlign: 'left' }}>{req.status}</td>
											<td style={{ padding: '12px 12px', color: COLORS.gunmetal, textAlign: 'left' }}>{req.owner}</td>
											<td style={{ padding: '12px 12px', color: COLORS.gunmetal, textAlign: 'left' }}>{req.department}</td>
											<td style={{ padding: '12px 12px', color: COLORS.gunmetal, textAlign: 'left' }}>{req.created}</td>
											<td style={{ padding: '12px 12px', color: COLORS.gunmetal, textAlign: 'left' }}>{req.priority}</td>
											<td style={{ padding: '12px 12px', textAlign: 'left' }}>
												<Button label="Details" type="default" size="narrow" hideIcons />
											</td>
										</tr>
									))}
									{paged.length === 0 && (
										<tr>
											<td
												colSpan={8}
												style={{
													textAlign: 'center',
													padding: 24,
													color: COLORS.silver,
												}}
											>
												No requests found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
							{/* Pagination */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '16px 24px',
									borderTop: `1px solid ${COLORS.lightSilver}`,
									background: COLORS.white,
								}}
							>
								<span style={{ color: COLORS.silver, fontSize: 15 }}>{filtered.length} items</span>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<span style={{ color: COLORS.gunmetal, fontSize: 15 }}>Rows per page</span>
									<select
										value={pageSize}
										onChange={e => {
											const newSize = parseInt(e.target.value, 10);
											setPage(1);
											setPageSize(newSize);
										}}
										style={{
											marginLeft: 8,
											padding: 4,
											color: COLORS.navyBlue,
											background: COLORS.almostWhite,
											border: `1px solid ${COLORS.lightSilver}`,
											borderRadius: 4,
										}}
									>
										{[5, 10, 20, 50].map(size => (
											<option key={size} value={size}>{size}</option>
										))}
									</select>
									<span style={{ color: COLORS.gunmetal, fontSize: 15 }}>
										Page {page} of {totalPages}
									</span>
									<div style={{ display: 'flex', gap: 4 }}>
										<Button
											label="⏮"
											type={page === 1 ? 'disabled' : 'default'}
											size="narrow"
											hideIcons
											onClick={() => page > 1 && setPage(1)}
											// @ts-ignore
											style={paginationBtnStyle}
										/>
										<Button
											label="‹"
											type={page === 1 ? 'disabled' : 'default'}
											size="narrow"
											hideIcons
											onClick={() => page > 1 && setPage(p => Math.max(1, p - 1))}
											// @ts-ignore
											style={paginationBtnStyle}
										/>
										<Button
											label="›"
											type={page === totalPages || totalPages === 0 ? 'disabled' : 'default'}
											size="narrow"
											hideIcons
											onClick={() => page < totalPages && setPage(p => Math.min(totalPages, p + 1))}
											// @ts-ignore
											style={paginationBtnStyle}
										/>
										<Button
											label="⏭"
											type={page === totalPages || totalPages === 0 ? 'disabled' : 'default'}
											size="narrow"
											hideIcons
											onClick={() => page < totalPages && setPage(totalPages)}
											// @ts-ignore
											style={paginationBtnStyle}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</>
		);
	}

	// Only summary cards and quick actions, no table or recent activity
	return (
		<div
			style={{
				
				background: COLORS.almostWhite,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100vw',
				
			}}
		>
			
			<main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, height: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING.xxl }}>
				<header style={{ marginBottom: SPACING.xl, textAlign: 'left' }}>
					<h1
						style={{
							...TYPOGRAPHY.titleDefault,
							color: COLORS.navyBlue,
							margin: 0,
							textAlign: 'center',
						}}
					>
						Dashboard Overview
					</h1>
					<p
						style={{
							...TYPOGRAPHY.bodyBigL,
							color: COLORS.gunmetal,
							margin: 0,
							marginTop: 8,
							textAlign: 'center',
						}}
					>
						Welcome back! Here’s a summary of your request management activity.
					</p>
				</header>
				{/* Place Quick Actions after summary cards for better context and workflow */}
				<LayoutGrid>
					{dashboardCards.map((card, idx) => (
						<Card
							key={idx}
							title={
								<span style={{ ...TYPOGRAPHY.titleSmallSM, color: card.color }}>
									{card.title}
								</span>
							}
							style={{ minHeight: 180, margin: 0 }}
							footer={
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Button
										label={card.button}
										type={card.color === COLORS.sangriaRed ? 'danger' : 'hot'}
										size="default"
										hideIcons
										onClick={() => card.onClick(navigate)}
									/>
								</div>
							}
						>
							<div
								style={{
									...TYPOGRAPHY.titleDefault,
									color: card.color,
									fontWeight: 700,
									fontSize: 48,
									marginBottom: 8,
								}}
							>
								{card.value}
							</div>
							<div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
								{card.description}
							</div>
						</Card>
					))}
				</LayoutGrid>
				<section style={{ marginTop: SPACING.xl }}>
					<h2
						style={{
							...TYPOGRAPHY.titleSmallSM,
							color: COLORS.navyBlue,
							marginBottom: SPACING.md,
							textAlign: 'center',
						}}
					>
						Quick Actions
					</h2>
					<div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
						<ButtonGroup
							size="default"
							buttons={[
								{ label: 'New Request', leftIcon: <IconPlus size={24} stroke={1.7} color={COLORS.navyBlue} /> },
								{ label: 'Export Data', leftIcon: <IconDownload size={24} stroke={1.7} color={COLORS.navyBlue} /> },
								{ label: 'Settings', leftIcon: <IconSettings2 size={24} stroke={1.7} color={COLORS.navyBlue} /> },
							]}
							hideRightIcons
						/>
					</div>
				</section>
			</main>
		</div>
	);
};

// Helper for narrow pagination button style
const paginationBtnStyle = {
  minWidth: 28,
  padding: '0 6px',
};

export default DashboardPage;
