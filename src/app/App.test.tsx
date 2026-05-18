import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App Component', () => {
    it('renders the dashboard header', () => {
        render(<App />);
        const heading = screen.getByRole('heading', { name: /ShelterFlow Dashboard/i });
        expect(heading).toBeInTheDocument();
    });
});