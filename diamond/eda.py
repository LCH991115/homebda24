import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# 다이아몬드 데이터셋 로드
diamonds = sns.load_dataset('diamonds')

# 마크다운 내용 초기화
md_content = "# Diamonds Dataset EDA\n\n"

# 기술 통계
md_content += "## 기술 통계\n\n"
md_content += "### 전체 설명\n"
md_content += diamonds.describe().to_markdown() + "\n\n"

md_content += "### 평균 값\n"
md_content += diamonds.mean(numeric_only=True).to_markdown() + "\n\n"

md_content += "### 표준 편차\n"
md_content += diamonds.std(numeric_only=True).to_markdown() + "\n\n"

md_content += "### 중앙값\n"
md_content += diamonds.median(numeric_only=True).to_markdown() + "\n\n"

md_content += "### 최소 값\n"
md_content += diamonds.min(numeric_only=True).to_markdown() + "\n\n"

md_content += "### 최대 값\n"
md_content += diamonds.max(numeric_only=True).to_markdown() + "\n\n"

# 시각화
md_content += "## 시각화\n\n"

# 시각화 1: 가격 히스토그램
plt.figure(figsize=(10, 6))
sns.histplot(diamonds['price'], bins=50, kde=True)
plt.title('다이아몬드 가격 히스토그램')
plt.savefig('images/hist_price.png')
plt.close()
md_content += "### 다이아몬드 가격 히스토그램\n"
md_content += "![가격 히스토그램](images/hist_price.png)\n\n"
md_content += "#### 피봇 테이블: 컷별 평균 가격\n"
pivot1 = pd.pivot_table(diamonds, values='price', index='cut', aggfunc='mean')
md_content += pivot1.to_markdown() + "\n\n"

# 시각화 2: 캐럿 vs 가격 산점도
plt.figure(figsize=(10, 6))
sns.scatterplot(data=diamonds, x='carat', y='price')
plt.title('캐럿 vs 가격 산점도')
plt.savefig('images/scatter_carat_price.png')
plt.close()
md_content += "### 캐럿 vs 가격 산점도\n"
md_content += "![산점도](images/scatter_carat_price.png)\n\n"
md_content += "#### 교차표: 컷과 색상별 개수\n"
crosstab1 = pd.crosstab(diamonds['cut'], diamonds['color'])
md_content += crosstab1.to_markdown() + "\n\n"

# 시각화 3: 컷별 가격 박스플롯
plt.figure(figsize=(10, 6))
sns.boxplot(data=diamonds, x='cut', y='price')
plt.title('컷별 가격 박스플롯')
plt.savefig('images/box_price_cut.png')
plt.close()
md_content += "### 컷별 가격 박스플롯\n"
md_content += "![박스플롯](images/box_price_cut.png)\n\n"
md_content += "#### 피봇 테이블: 컷과 투명도별 중앙값 가격\n"
pivot2 = pd.pivot_table(diamonds, values='price', index='cut', columns='clarity', aggfunc='median')
md_content += pivot2.to_markdown() + "\n\n"

# 시각화 4: 색상별 개수 바플롯
plt.figure(figsize=(10, 6))
sns.countplot(data=diamonds, x='color')
plt.title('색상별 다이아몬드 개수')
plt.savefig('images/bar_color.png')
plt.close()
md_content += "### 색상별 개수 바플롯\n"
md_content += "![바플롯](images/bar_color.png)\n\n"
md_content += "#### 교차표: 색상과 컷별 개수\n"
crosstab2 = pd.crosstab(diamonds['color'], diamonds['cut'])
md_content += crosstab2.to_markdown() + "\n\n"

# 시각화 5: 상관관계 히트맵
plt.figure(figsize=(10, 6))
corr = diamonds.select_dtypes(include=[float, int]).corr()
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title('상관관계 히트맵')
plt.savefig('images/heatmap_corr.png')
plt.close()
md_content += "### 상관관계 히트맵\n"
md_content += "![히트맵](images/heatmap_corr.png)\n\n"
md_content += "#### 피봇 테이블: 컷과 색상별 평균 캐럿\n"
pivot3 = pd.pivot_table(diamonds, values='carat', index='cut', columns='color', aggfunc='mean')
md_content += pivot3.to_markdown() + "\n\n"

# 마크다운 파일로 저장
with open('analysis.md', 'w') as f:
    f.write(md_content)

print("EDA 완료 및 analysis.md에 저장됨")