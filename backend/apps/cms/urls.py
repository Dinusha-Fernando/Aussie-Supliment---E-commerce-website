from django.urls import path
from .views import (
    SiteConfigView,
    HeroSlideListCreateView,
    HeroSlideDetailView,
    DiagnosticQuizListCreateView,
    DiagnosticQuizDetailView,
    TrustPillarListCreateView,
    TrustPillarDetailView,
)

urlpatterns = [
    path('config/', SiteConfigView.as_view(), name='cms-config'),
    path('hero-slides/', HeroSlideListCreateView.as_view(), name='cms-hero-slides'),
    path('hero-slides/<int:pk>/', HeroSlideDetailView.as_view(), name='cms-hero-slide-detail'),
    path('quiz/', DiagnosticQuizListCreateView.as_view(), name='cms-quiz'),
    path('quiz/<int:pk>/', DiagnosticQuizDetailView.as_view(), name='cms-quiz-detail'),
    path('trust-pillars/', TrustPillarListCreateView.as_view(), name='cms-trust-pillars'),
    path('trust-pillars/<int:pk>/', TrustPillarDetailView.as_view(), name='cms-trust-pillar-detail'),
]
