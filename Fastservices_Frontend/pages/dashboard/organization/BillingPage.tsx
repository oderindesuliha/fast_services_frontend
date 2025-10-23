import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const PlanCard: React.FC<{ title: string, price: string, description: string, features: string[], popular?: boolean }> = ({ title, price, description, features, popular }) => (
    <div className={`bg-white dark:bg-gray-800 border rounded-lg p-6 relative flex flex-col ${popular ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
        {popular && <span className="absolute top-0 -translate-y-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">POPULAR</span>}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <p className="text-3xl font-bold my-4">{price}</p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400 flex-grow">
            {features.map((feature, i) => <li key={i} className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-1 flex-shrink-0"/><span>{feature}</span></li>)}
        </ul>
        <button className={`w-full mt-6 py-2 rounded-md font-semibold transition-colors ${popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>Choose Plan</button>
    </div>
);

const BillingPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Billing & Subscriptions</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">Choose the plan that fits your organization's needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <PlanCard 
                    title="Pay-Per-Use" 
                    price="&#8358;50 / apt"
                    description="For smaller businesses with fluctuating needs."
                    features={["Basic queue management", "1 active queue", "Email support"]}
                />
                <PlanCard 
                    title="Business" 
                    price="&#8358;20,000 / mo"
                    description="Ideal for established businesses and clinics."
                    features={["Unlimited queues", "5 staff accounts", "Basic analytics dashboard", "Priority email support"]} 
                    popular={true}
                />
                <PlanCard 
                    title="Premium Features" 
                    price="&#8358;45,000 / mo"
                    description="Advanced tools for larger operations."
                    features={["All Business features", "Custom branding", "Advanced data analytics", "API access for integration"]}
                />
                <PlanCard 
                    title="Integration Services" 
                    price="Contact Us" 
                    description="Custom solutions for enterprises."
                    features={["Custom setup & onboarding", "Integration with existing systems", "Dedicated account manager"]}
                />
            </div>
        </div>
    );
};
export default BillingPage;
