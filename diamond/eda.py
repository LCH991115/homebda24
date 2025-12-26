import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Load the diamonds dataset
diamonds = sns.load_dataset('diamonds')

# Initialize markdown content
md_content = "# Diamonds Dataset EDA\n\n"

# Descriptive Statistics
md_content += "## Descriptive Statistics\n\n"
md_content += "### Overall Describe\n"
md_content += diamonds.describe().to_markdown() + "\n\n"

md_content += "### Mean Values\n"
md_content += diamonds.mean(numeric_only=True).to_markdown() + "\n\n"

md_content += "### Standard Deviation\n"
md_content += diamonds.std(numeric_only=True).to_markdown() + "\n\n"

md_content += "### Median Values\n"
md_content += diamonds.median(numeric_only=True).to_markdown() + "\n\n"

md_content += "### Minimum Values\n"
md_content += diamonds.min(numeric_only=True).to_markdown() + "\n\n"

md_content += "### Maximum Values\n"
md_content += diamonds.max(numeric_only=True).to_markdown() + "\n\n"

# Visualizations
md_content += "## Visualizations\n\n"

# Visualization 1: Histogram of Price
plt.figure(figsize=(10, 6))
sns.histplot(diamonds['price'], bins=50, kde=True)
plt.title('Histogram of Diamond Prices')
plt.savefig('images/hist_price.png')
plt.close()
md_content += "### Histogram of Diamond Prices\n"
md_content += "![Histogram of Prices](images/hist_price.png)\n\n"
md_content += "#### Pivot Table: Mean Price by Cut\n"
pivot1 = pd.pivot_table(diamonds, values='price', index='cut', aggfunc='mean')
md_content += pivot1.to_markdown() + "\n\n"

# Visualization 2: Scatter Plot of Carat vs Price
plt.figure(figsize=(10, 6))
sns.scatterplot(data=diamonds, x='carat', y='price')
plt.title('Scatter Plot of Carat vs Price')
plt.savefig('images/scatter_carat_price.png')
plt.close()
md_content += "### Scatter Plot of Carat vs Price\n"
md_content += "![Scatter Plot](images/scatter_carat_price.png)\n\n"
md_content += "#### Cross Tab: Count by Cut and Color\n"
crosstab1 = pd.crosstab(diamonds['cut'], diamonds['color'])
md_content += crosstab1.to_markdown() + "\n\n"

# Visualization 3: Box Plot of Price by Cut
plt.figure(figsize=(10, 6))
sns.boxplot(data=diamonds, x='cut', y='price')
plt.title('Box Plot of Price by Cut')
plt.savefig('images/box_price_cut.png')
plt.close()
md_content += "### Box Plot of Price by Cut\n"
md_content += "![Box Plot](box_price_cut.png)\n\n"
md_content += "#### Pivot Table: Median Price by Cut and Clarity\n"
pivot2 = pd.pivot_table(diamonds, values='price', index='cut', columns='clarity', aggfunc='median')
md_content += pivot2.to_markdown() + "\n\n"

# Visualization 4: Bar Plot of Count by Color
plt.figure(figsize=(10, 6))
sns.countplot(data=diamonds, x='color')
plt.title('Count of Diamonds by Color')
plt.savefig('images/bar_color.png')
plt.close()
md_content += "### Bar Plot of Count by Color\n"
md_content += "![Bar Plot](bar_color.png)\n\n"
md_content += "#### Cross Tab: Count by Color and Cut\n"
crosstab2 = pd.crosstab(diamonds['color'], diamonds['cut'])
md_content += crosstab2.to_markdown() + "\n\n"

# Visualization 5: Heatmap of Correlation
plt.figure(figsize=(10, 6))
corr = diamonds.select_dtypes(include=[float, int]).corr()
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')
plt.savefig('images/heatmap_corr.png')
plt.close()
md_content += "### Correlation Heatmap\n"
md_content += "![Heatmap](heatmap_corr.png)\n\n"
md_content += "#### Pivot Table: Mean Carat by Cut and Color\n"
pivot3 = pd.pivot_table(diamonds, values='carat', index='cut', columns='color', aggfunc='mean')
md_content += pivot3.to_markdown() + "\n\n"

# Save to markdown file
with open('analysis.md', 'w') as f:
    f.write(md_content)

print("EDA completed and saved to analysis.md")