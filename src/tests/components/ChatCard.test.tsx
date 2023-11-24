import { render, screen } from '@testing-library/react';
import { ChatCard } from '../../components/ChatCard';

const getChatName = () => screen.getByText('Test Chat') as HTMLSpanElement;
const getBadge = () => screen.getByText('+5') as HTMLDivElement;
const getLatestMessage = () => screen.getByText('Hello') as HTMLSpanElement;

describe('ChatCard, not latest message', () => {
	beforeEach(() => {
		render(<ChatCard chatName="Test Chat" unreadMessages={5} />);
	});

	test('ChatCard is displaying correctly', () => {
		const chatName = getChatName();
		const badge = getBadge();

		expect(chatName).toBeDefined();
		expect(badge).toBeDefined();

		expect(chatName.textContent).toBe('Test Chat');
		expect(badge.textContent).toBe('+5');

		expect(chatName.className).toContain('mt-[0.65rem]');
	});
});

describe('ChatCard, with latest message', () => {
	beforeEach(() => {
		render(
			<ChatCard chatName="Test Chat" unreadMessages={5} latestMessage="Hello" />
		);
	});

	test('ChatCard is displaying correctly', () => {
		const chatName = getChatName();
		const badge = getBadge();
		const latestMessage = getLatestMessage();

		expect(chatName).toBeDefined();
		expect(badge).toBeDefined();
		expect(latestMessage).toBeDefined();

		expect(chatName.textContent).toBe('Test Chat');
		expect(badge.textContent).toBe('+5');
		expect(latestMessage.textContent).toBe('Hello');

		expect(chatName.className).not.toContain('mt-[0.65rem]');
	});
});
