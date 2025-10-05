// Enhanced interactivity for the eShopCo Compression Lab website

document.addEventListener("DOMContentLoaded", function () {
	// Animated counter for statistics
	function animateCounter(element, target, duration = 2000) {
		const start = 0;
		const startTime = performance.now();

		function updateCounter(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);

			let current;
			if (typeof target === "string" && target.includes("%")) {
				current = Math.round(easeOutQuart * parseFloat(target)) + "%";
			} else if (typeof target === "string" && target.includes("x")) {
				current = (easeOutQuart * parseFloat(target)).toFixed(1) + "x";
			} else {
				current = Math.round(easeOutQuart * target);
			}

			element.textContent = current;

			if (progress < 1) {
				requestAnimationFrame(updateCounter);
			} else {
				element.textContent = target;
			}
		}

		requestAnimationFrame(updateCounter);
	}

	// Intersection Observer for triggering animations
	const observerOptions = {
		threshold: 0.3,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate");

				// Animate counters when they come into view
				if (entry.target.classList.contains("stat-number")) {
					const targetText = entry.target.textContent;
					animateCounter(entry.target, targetText);
				}
			}
		});
	}, observerOptions);

	// Observe all stat numbers and cards
	document
		.querySelectorAll(".stat-number")
		.forEach((el) => observer.observe(el));
	document.querySelectorAll(".stat-card").forEach((el) => observer.observe(el));
	document
		.querySelectorAll(".solution-step")
		.forEach((el) => observer.observe(el));
	document
		.querySelectorAll(".result-card")
		.forEach((el) => observer.observe(el));
	document
		.querySelectorAll(".impact-card")
		.forEach((el) => observer.observe(el));

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Dynamic size bar animation
	function animateSizeBar() {
		const sizeBar = document.querySelector(".size-compressed");
		if (sizeBar) {
			// Reset animation
			sizeBar.style.width = "0%";
			sizeBar.style.opacity = "0";

			// Animate to final width
			setTimeout(() => {
				sizeBar.style.transition =
					"all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
				sizeBar.style.width = "3.3%";
				sizeBar.style.opacity = "1";
			}, 500);
		}
	}

	// Observe size comparison section
	const sizeComparisonObserver = new IntersectionObserver(
		function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateSizeBar();
					sizeComparisonObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	const sizeComparison = document.querySelector(".size-comparison");
	if (sizeComparison) {
		sizeComparisonObserver.observe(sizeComparison);
	}

	// Add hover effects for method cards
	document.querySelectorAll(".method-card").forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-5px) scale(1.02)";
			this.style.transition = "all 0.3s ease";
		});

		card.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0) scale(1)";
		});
	});

	// Copy email functionality
	document.querySelectorAll(".email").forEach((emailElement) => {
		emailElement.style.cursor = "pointer";
		emailElement.title = "Click to copy email address";

		emailElement.addEventListener("click", function () {
			const email = "24f2001777@ds.study.iitm.ac.in";

			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(email).then(() => {
					showCopyNotification(this);
				});
			} else {
				// Fallback for older browsers
				const textArea = document.createElement("textarea");
				textArea.value = email;
				document.body.appendChild(textArea);
				textArea.select();
				try {
					document.execCommand("copy");
					showCopyNotification(this);
				} catch (err) {
					console.error("Failed to copy email");
				}
				document.body.removeChild(textArea);
			}
		});
	});

	function showCopyNotification(element) {
		const originalText = element.textContent;
		element.textContent = "Email copied!";
		element.style.background = "#27ae60";

		setTimeout(() => {
			element.textContent = originalText;
			element.style.background = "rgba(255, 255, 255, 0.1)";
		}, 2000);
	}

	// Performance metrics simulation (for demo purposes)
	function simulateRealTimeMetrics() {
		const metricsData = {
			loadTime: { current: 3.2, target: 2.1, unit: "s" },
			bandwidth: { current: 7.1, target: 0.236, unit: "KB" },
			compressionRatio: { current: 1, target: 30.1, unit: "x" },
		};

		// This could be expanded to show real-time performance data
		console.log("Real-time metrics available:", metricsData);
	}

	// Initialize metrics simulation
	simulateRealTimeMetrics();

	// Add scroll-based parallax effect to hero section
	window.addEventListener("scroll", function () {
		const scrolled = window.pageYOffset;
		const hero = document.querySelector(".hero");
		if (hero) {
			const rate = scrolled * -0.5;
			hero.style.transform = `translateY(${rate}px)`;
		}
	});

	// Code syntax highlighting simulation
	function enhanceCodeDisplay() {
		const codeElement = document.querySelector("code");
		if (codeElement) {
			const code = codeElement.textContent;

			// Simple syntax highlighting (basic implementation)
			const highlightedCode = code
				.replace(
					/(def|import|from|with|if|return|True|False)/g,
					'<span style="color: #f39c12;">$1</span>'
				)
				.replace(
					/(Image|np|BytesIO|array_equal)/g,
					'<span style="color: #e74c3c;">$1</span>'
				)
				.replace(/('.*?'|".*?")/g, '<span style="color: #27ae60;">$1</span>')
				.replace(/(#.*$)/gm, '<span style="color: #95a5a6;">$1</span>');

			codeElement.innerHTML = highlightedCode;
		}
	}

	// Apply syntax highlighting
	enhanceCodeDisplay();

	// Add loading animation for the page
	function hideLoader() {
		const loader = document.querySelector(".loader");
		if (loader) {
			loader.style.opacity = "0";
			setTimeout(() => {
				loader.style.display = "none";
			}, 300);
		}
	}

	// Hide loader after content is loaded
	window.addEventListener("load", hideLoader);

	console.log(
		"🚀 eShopCo Compression Lab - Interactive features loaded successfully!"
	);
});
