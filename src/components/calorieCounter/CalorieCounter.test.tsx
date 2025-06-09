import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CalorieCounter from './CalorieCounter';

describe('CalorieCounter Component', () => {
    test('renders all form fields correctly', () => {
        render(<CalorieCounter />);
        
        expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Weight/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Height/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Activity Level/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Calculate Calories/i })).toBeInTheDocument();
    });

    test('validates required fields on submit', async () => {
        render(<CalorieCounter />);

        const calculateButton = screen.getByRole('button', { name: /Calculate Calories/i });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Gender is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Weight is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Height is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Activity Level is required/i)).toBeInTheDocument();
        });
    });

    test('calculates calories correctly for a valid input', async () => {
        render(<CalorieCounter />);

        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: 25 } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
        fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: 70 } });
        fireEvent.change(screen.getByLabelText(/Height/i), { target: { value: 175 } });
        fireEvent.change(screen.getByLabelText(/Activity Level/i), { target: { value: '1.55' } });

        const calculateButton = screen.getByRole('button', { name: /Calculate Calories/i });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByText(/BMI:/i)).toBeInTheDocument();
            expect(screen.getByText(/BMR:/i)).toBeInTheDocument();
            expect(screen.getByText(/TDEE:/i)).toBeInTheDocument();
        });
    });

    test('opens modal with results on calculation', async () => {
        render(<CalorieCounter />);

        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: 30 } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'female' } });
        fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: 60 } });
        fireEvent.change(screen.getByLabelText(/Height/i), { target: { value: 160 } });
        fireEvent.change(screen.getByLabelText(/Activity Level/i), { target: { value: '1.375' } });

        const calculateButton = screen.getByRole('button', { name: /Calculate Calories/i });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByText(/Calorie Results/i)).toBeInTheDocument();
            expect(screen.getByText(/BMI:/i)).toBeInTheDocument();
            expect(screen.getByText(/BMR:/i)).toBeInTheDocument();
            expect(screen.getByText(/TDEE:/i)).toBeInTheDocument();
        });
    });

    test('calls saveCalories function when Save Calorie Data is clicked', async () => {
        const mockSaveCalories = jest.fn();
        jest.mock('../../services/auth.service', () => ({
            saveCalories: mockSaveCalories
        }));

        render(<CalorieCounter />);

        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: 30 } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'female' } });
        fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: 60 } });
        fireEvent.change(screen.getByLabelText(/Height/i), { target: { value: 160 } });
        fireEvent.change(screen.getByLabelText(/Activity Level/i), { target: { value: '1.375' } });

        const calculateButton = screen.getByRole('button', { name: /Calculate Calories/i });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByText(/Save Calorie Data/i)).toBeInTheDocument();
        });

        const saveButton = screen.getByRole('button', { name: /Save Calorie Data/i });
        fireEvent.click(saveButton);

        expect(mockSaveCalories).toHaveBeenCalledWith(expect.anything(), {
            caloriesRequired: expect.any(Number),
            weightRange: expect.stringMatching(/\d+\.\d+ - \d+\.\d+/)
        });
    });
});
