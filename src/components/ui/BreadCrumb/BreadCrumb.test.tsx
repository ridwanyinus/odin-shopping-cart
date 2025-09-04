import { useMatches } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BreadcrumbNav from "./Breadcrumb";

// Mock the react-router hook
vi.mock("@tanstack/react-router", () => ({
	useMatches: vi.fn(),
	Link: ({ to, children, className, "aria-current": ariaCurrent }: any) => (
		<a href={to} className={className} aria-current={ariaCurrent}>
			{children}
		</a>
	),
}));

// Mock the SVG import
vi.mock("@/assets/arrow-right.svg", () => ({
	default: "arrow-right.svg",
}));

// Mock the CSS module
vi.mock("./Breadcrumb.module.scss", () => ({
	default: {
		breadcrumb: "breadcrumb",
		breadcrumb__line: "breadcrumb__line",
		breadcrumb__list: "breadcrumb__list",
		breadcrumb__item: "breadcrumb__item",
		breadcrumb__link: "breadcrumb__link",
	},
}));

const mockUseMatches = useMatches as any;

describe("BreadcrumbNav", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders basic breadcrumb navigation", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/about",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "About",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
		expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("About")).toBeInTheDocument();
	});

	it("filters out matches without getTitle context", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/intermediate",
				context: {
					// No getTitle method
					getBreadcrumb: () => "Intermediate",
				},
			},
			{
				pathname: "/final",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Final",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.queryByText("Intermediate")).not.toBeInTheDocument();
		expect(screen.getByText("Final")).toBeInTheDocument();
	});

	it("adds Shop breadcrumb for product pages", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/shop/product/123",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Product Name",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		const breadcrumbItems = screen.getAllByRole("listitem");
		const links = screen.getAllByRole("link");

		expect(breadcrumbItems).toHaveLength(3); // Home, Shop, Product
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Shop")).toBeInTheDocument();
		expect(screen.getByText("Product Name")).toBeInTheDocument();

		// Check that Shop link has correct href
		const shopLink = links.find((link) => link.textContent === "Shop");
		expect(shopLink).toHaveAttribute("href", "/shop");
	});

	it("does not add Shop breadcrumb for non-product pages", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/shop",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Shop",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		const breadcrumbItems = screen.getAllByRole("listitem");
		expect(breadcrumbItems).toHaveLength(2); // Only Home and Shop
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Shop")).toBeInTheDocument();
	});

	it("renders arrow separators between breadcrumb items except for the last one", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/category",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Category",
				},
			},
			{
				pathname: "/category/item",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Item",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		const arrows = screen.getAllByRole("img", { hidden: true });
		expect(arrows).toHaveLength(2); // Between Home-Category and Category-Item, but not after Item

		arrows.forEach((arrow) => {
			expect(arrow).toHaveAttribute("src", "arrow-right.svg");
		});
	});

	it('sets aria-current="page" on the last breadcrumb item', () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/current-page",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Current Page",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		const links = screen.getAllByRole("link");
		const homeLink = links.find((link) => link.textContent === "Home");
		const currentPageLink = links.find(
			(link) => link.textContent === "Current Page",
		);

		expect(homeLink).not.toHaveAttribute("aria-current");
		expect(currentPageLink).toHaveAttribute("aria-current", "page");
	});

	it("handles matches array with at least two items (component requirement)", () => {
		// The component requires at least 2 matches since it accesses matches[matches.length - 1].pathname
		// Testing with minimum required matches
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/current",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Current",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
		const list = screen.getByRole("list");
		expect(list).toBeInTheDocument();
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Current")).toBeInTheDocument();
	});

	it("renders with correct CSS classes", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		const nav = screen.getByRole("navigation");
		expect(nav).toHaveClass("container", "breadcrumb");

		const line = nav.querySelector(".breadcrumb__line");
		expect(line).toBeInTheDocument();

		const list = screen.getByRole("list");
		expect(list).toHaveClass("breadcrumb__list");

		const listItem = screen.getByRole("listitem");
		expect(listItem).toHaveClass("breadcrumb__item");

		const link = screen.getByRole("link");
		expect(link).toHaveClass("breadcrumb__link");
	});

	it("handles product page with deep nesting", () => {
		const mockMatches = [
			{
				pathname: "/",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Home",
				},
			},
			{
				pathname: "/category",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Category",
				},
			},
			{
				pathname: "/shop/product/123/details",
				context: {
					getTitle: vi.fn(),
					getBreadcrumb: () => "Product Details",
				},
			},
		];

		mockUseMatches.mockReturnValue(mockMatches);

		render(<BreadcrumbNav />);

		const breadcrumbItems = screen.getAllByRole("listitem");
		expect(breadcrumbItems).toHaveLength(4); // Home, Category, Shop, Product Details

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Category")).toBeInTheDocument();
		expect(screen.getByText("Shop")).toBeInTheDocument();
		expect(screen.getByText("Product Details")).toBeInTheDocument();
	});
});
